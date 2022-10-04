import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { CommonService, PermissionFormModel, PermissionItemModel, RoleListModel, PermissionService, AuthUserData, PermissionModel, DataResponseModel } from 'src/app/shared';

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss']
})
export class PermissionFormComponent implements OnInit {
  @Input() id: number;
  @Input() formData: PermissionFormModel;
  pageTitle: string;
  itemId: number;
  errorList: any[];
  submitted = false;
  roleList: RoleListModel[] = [];
  permissionList: PermissionItemModel[] = [];
  requestForm: FormGroup;
  loading: boolean;
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: DataResponseModel<PermissionModel> };
    drawerRef: NzDrawerRef<DataResponseModel<PermissionModel>>;
  }>;

  constructor(
    private drawerRef: NzDrawerRef<any>,
    private commonService: CommonService,
    private permissionService: PermissionService,
    private userData: AuthUserData,
    // private roleService: RoleService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    if (this.formData) {
      this.itemId = this.formData.id;
    } else {
      this.formData = new PermissionFormModel();
    }
    this.createForm();
  }

  createForm() {
    this.requestForm = this.formBuilder.group({
      id: [this.formData.id],
      name: [this.formData.name, [Validators.required]],
      module: [this.formData.module, []],
      description: [this.formData.description],
      // permissions: new FormArray([]), // this.formData.permissions
    });
  }

  getData(id: string): void {
    this.commonService.showLoading();
    this.permissionService.getById(id).subscribe(
      (result) => {
        this.formData = result;
      },
      (error) => {
        this.commonService.handleError(error);
      },
      () => {
        this.commonService.hideLoading();
      }
    );
  }

  get form(): any {
    return this.requestForm.controls;
  }

  onFormSubmit(): void {
    this.submitted = true;
    if (this.requestForm.valid) {
      this.commonService.showLoading();
      this.formData = this.requestForm.value;
      if (!this.itemId) {
        this.formData.createdBy = this.userData.getUserData()?.emailAddress;
        delete this.formData.id;
      } else {
        this.formData.updatedBy = this.userData.getUserData()?.emailAddress;
      }
      let service = (this.itemId) ? this.permissionService.update(this.formData.id, this.formData) : this.permissionService.post(this.formData);

      service.subscribe(
        (response) => {
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
