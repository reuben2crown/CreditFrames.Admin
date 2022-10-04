import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { forkJoin } from 'rxjs';
import { AuthUserData, CommonService, DataResponseModel, PermissionModel, PermissionService, RoleFormModel, RoleListModel, RoleModel, RolePermissionModel, RoleService } from 'src/app/shared';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  @Input() id: number;
  @Input() formData: RoleFormModel;
  pageTitle: string;
  itemId: number;
  errorList: any[];
  loading = false;
  submitted = false;
  roleList: RoleListModel[] = [];
  permissionItems: PermissionModel[] = [];
  requestForm: FormGroup;
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: DataResponseModel<RoleModel> };
    drawerRef: NzDrawerRef<DataResponseModel<RoleModel>>;
  }>;

  constructor(
    private drawerRef: NzDrawerRef<any>,
    private commonService: CommonService,
    private roleService: RoleService,
    private userData: AuthUserData,
    private permissionService: PermissionService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    if (this.formData) {
      this.itemId = this.formData.id;
    } else {
      this.formData = new RoleFormModel();
    }
    this.createForm();
  }

  createForm() {
    this.requestForm = this.formBuilder.group({
      id: [this.formData.id],
      name: [this.formData.name, [Validators.required]],
      updateUserAccess: [false],
      permissions: new FormArray([])
    });

    this.getRoleAndPermissions();
  }

  getRoleAndPermissions(): void {
    this.commonService.showLoading();
    this.loading = true;
    forkJoin([this.permissionService.getAll(), this.roleService.getById(this.formData.id)]).subscribe(results => {
      this.permissionItems = results[0];
      this.formData = results[1];
      var rolePermissions = results[1].permissions || [];
      this.permissionItems.forEach(item => {
        this.permissionList.push(this.formBuilder.group({
          permissionId: [item.id],
          permissionName: [item.name],
          isSelected: rolePermissions.some(x => x.permissionId == item.id) || false
        }));
      });
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

  get form(): any {
    return this.requestForm.controls;
  }

  get permissionList(): FormArray {
    return this.requestForm.get("permissions") as FormArray
  }

  onFormSubmit(): void {
    if (this.requestForm.valid) {
    this.submitted = true;
      this.commonService.showLoading();
      this.formData = this.requestForm.value;
      var permissions = (this.permissionList.value as RolePermissionModel[]).filter(x => x.isSelected) || [];
      this.formData.permissions = permissions;
      if (!this.itemId) {
        this.formData.createdBy = this.userData.getUserData()?.emailAddress;
        delete this.formData.id;
      } else {
        this.formData.updatedBy = this.userData.getUserData()?.emailAddress;
      }
      let service = (this.itemId) ? this.roleService.update(this.formData.id, this.formData) : this.roleService.post(this.formData);

      service.subscribe((response) => {
          if (response) {
            if (response.status) {
              this.drawerRef.close(response.data || this.formData);
              this.commonService.showToastSuccess(response.message);
            } else {
              this.commonService.hideLoading();
              this.commonService.showToastError(response.message);
              this.errorList = response.error || [];
            }
          }
        },
        (error) => {
          this.errorList = error.error || [];
          this.commonService.handleError(error);
        },
        () => {
          this.submitted = false;
          this.commonService.hideLoading();
        }
      );
    } else {
      this.commonService.checkFormValidation(this.requestForm);
      this.commonService.showToastWarning(
        'Validation Error. Please check the fields and try again'
      );
    }
  }

  closeModal(): void {
    this.drawerRef.close();
  }
}
