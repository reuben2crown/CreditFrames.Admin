import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { forkJoin } from 'rxjs';
import { AuthService, AuthTokenModel, AuthUserData, ChangePasswordModel, ChannelEnum, CommonService, DataResponseModel, PermissionModel, RoleModel, RoleService, UserModel, UserPermissionModel, UserService } from 'src/app/shared';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() id: number;
  requestForm: FormGroup;
  user: AuthTokenModel;
  showPassword: boolean;
  loading: boolean;

  roleList: RoleModel[] = [];
  permissionItems: PermissionModel[] = [];
  userPermissions: UserPermissionModel[] = [];
  checkAll: boolean;
  indeterminate = true;

  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: DataResponseModel<UserModel> };
    drawerRef: NzDrawerRef<DataResponseModel<UserModel>>;
  }>;

  @Input() data: UserModel;

  constructor(private drawerRef: NzDrawerRef<any>, public router: Router, private commonService: CommonService, private userService: UserService, private authService: AuthService, private authData: AuthUserData, private roleService: RoleService) { }

  ngOnInit(): void {
    this.createForm();
    if (this.id) {
      this.getUserDetails();
    } else {
      this.showPassword = true;
    }
    this.user = this.authData.getUserData();
  }

  close(): void {
    this.drawerRef.close();
  }

  getUserDetails() {
    this.commonService.showLoading();
    this.loading = true;
    this.userService.getById(this.id).subscribe(response => {
      this.requestForm.patchValue(response, { onlySelf: true });
      this.validatePassword();
      this.loading = false;
      this.commonService.hideLoading();
    }, error => {
      this.loading = false;
      this.commonService.handleError(error);
    });
  }

  createForm(): void {
    this.requestForm = new FormGroup({
      id: new FormControl(0),
      lastName: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null),
      emailAddress: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, [Validators.required, this.passwordConfirming]),

      roleId: new FormControl(this.data?.roleId, [Validators.required]),
      enable2FA: new FormControl(this.data?.enable2FA || false),
      isActive: new FormControl(this.data?.isActive || true),
      isBlocked: new FormControl(this.data?.isBlocked || false),
      blockedReason: new FormControl(this.data?.blockedReason),
      permissions: new FormArray([]),
    });
    this.validatePassword();

    this.getUserAndRoles();
  }

  validatePassword() {
    if (!this.id || this.showPassword) {
      this.requestForm.get("password").setValidators(Validators.required);
      this.requestForm.get("password").updateValueAndValidity();
      this.requestForm.get("confirmPassword").setValidators(Validators.required);
      this.requestForm.get("confirmPassword").setValidators(this.passwordConfirming);
      this.requestForm.get("confirmPassword").updateValueAndValidity();
    } else {
      this.requestForm.get("password").clearValidators();
      this.requestForm.get("password").updateValueAndValidity();
      this.requestForm.get("confirmPassword").clearValidators();
      this.requestForm.get("confirmPassword").updateValueAndValidity();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.validatePassword();
  }

  onFormSubmit() {
    if (this.requestForm.valid) {
      this.loading = true;
      this.commonService.showLoading();
      let formData = this.requestForm.value;
      formData.createdBy = `${this.user.firstName} ${this.user.lastName}`;
      formData.userId = this.id;
      formData.channel = ChannelEnum.Admin;

      if (this.id && this.showPassword) {
        // process change password
        if (!formData.password) {
          this.commonService.showMessage('Please provide a password', 'warning');
          this.loading = false;
          this.commonService.hideLoading();
          return;
        }
        var model: ChangePasswordModel = {
          userId: this.id,
          newPassword: formData.password,
          confirmPassword: formData.confirmPassword
        };
        this.authService.changePassword(model).subscribe(response => {
          this.loading = false;
          this.commonService.hideLoading();
          if (response.status) {
            this.commonService.showToastSuccess(response.message);
            this.drawerRef.close(response);
          }
          else {
            this.commonService.showToastError(response.message);
          }
        }, error => {
          this.loading = false;
          this.commonService.handleError(error);
        });
      } else {
        //create or edit user
        if (this.id) {
          formData.id = this.id;
        }

        let service = (this.id) ? this.userService.update(this.id, formData) : this.userService.createAdmin(formData);

        service.subscribe(response => {
          this.loading = false;
          this.commonService.hideLoading();
          if (response.status) {
            this.commonService.showToastSuccess(response.message);
            this.drawerRef.close(response);
            // this.router.navigate(['/users']);
          }
          else {
            this.commonService.showToastError(response.message);
          }
        }, error => {
          this.loading = false;
          this.commonService.handleError(error);
        });
      }
    } else {
      this.commonService.checkFormValidation(this.requestForm);
      this.commonService.showToastWarning("Validation Error. Please check the fields and try again");
    }
  }

  passwordConfirming(c: AbstractControl): any {
    if (!c.parent || !c) { return; }
    const pwd = c.parent.get('password');
    const cpwd = c.parent.get('confirmPassword');

    if (!pwd && !cpwd) { return; }
    if (pwd.value !== cpwd.value) {
      return { mustMatch: true, invalid: true };
    }
  }
  
  getUserAndRoles(): void {
    if (!this.roleList.length && !this.userPermissions.length) {
      this.commonService.showLoading();
      this.loading = true;
      forkJoin([this.roleService.getAll(), this.userService.getById(this.data?.id)]).subscribe(results => {
        this.roleList = results[0];
        this.data = results[1];
        this.userPermissions = results[1].permissions || [];
        if (this.data.roleId) {
          this.getRolePermissions(this.data.roleId);
        }
        this.commonService.hideLoading();
        this.loading = false;
      },
        (error) => {
          this.commonService.handleError(error);
          this.loading = false;
        },
        () => {
          this.commonService.hideLoading();
          this.loading = false;
        });
    }
  }

  get permissionList(): FormArray {
    return this.requestForm.get("permissions") as FormArray
  }

  get form(): any {
    return this.requestForm.controls;
  }

  getRolePermissions(roleId) {
    this.permissionList.clear();
    if (roleId) {
      this.roleService.getRolePermissions(roleId).subscribe(result => {
        this.permissionItems = result?.map(x => x.permission) || [];
        if (this.permissionItems.length) {
          this.permissionItems.forEach(item => {
            this.permissionList.push(new FormGroup({
              permissionId: new FormControl(item.id),
              permissionName: new FormControl(item.name),
              isSelected: new FormControl(this.userPermissions.some(x => x.permissionId == item.id) || false)
            }));
          });
        }
        this.commonService.hideLoading();
        this.loading = false;
      },
        (error) => {
          this.loading = false;
          this.commonService.handleError(error);
        });
    }
  }

  onCheckAll(value: boolean) {
    this.indeterminate = false;
    setTimeout(() => {
      (this.requestForm.get("permissions") as FormArray).controls.forEach((item) => {
        item.patchValue({ isSelected: value }); //, { onlySelf: true }
      });
    }, 0);
  }

  updateSingleChecked(): void {
    if ((this.requestForm.get("permissions") as FormArray).controls.every(item => !item.value.isSelected)) {
      this.checkAll = false;
      this.indeterminate = false;
    } else if ((this.requestForm.get("permissions") as FormArray).controls.every(item => item.value.isSelected)) {
      this.checkAll = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }

}
