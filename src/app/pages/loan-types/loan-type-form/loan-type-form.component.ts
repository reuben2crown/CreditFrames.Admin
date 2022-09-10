import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { AuthService, AuthTokenModel, AuthUserData, CommonService, DataResponseModel } from 'src/app/shared';
import { LoanTypeModel } from 'src/app/shared/models/loan-type-model';
import { LoanTypeService } from 'src/app/shared/services/loan-type.service';

@Component({
  selector: 'app-loan-type-form',
  templateUrl: './loan-type-form.component.html',
  styleUrls: ['./loan-type-form.component.scss']
})
export class LoanTypeFormComponent implements OnInit {
  @Input() id: number;
  requestForm: FormGroup;
  user: AuthTokenModel;
  showPassword: boolean;
  loading: boolean;
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: DataResponseModel<LoanTypeModel> };
    drawerRef: NzDrawerRef<DataResponseModel<LoanTypeModel>>;
  }>;

  @Input() data: LoanTypeModel;

  constructor(
    private drawerRef: NzDrawerRef<any>, 
    public router: Router, private commonService: CommonService,
     private loanTypeService: LoanTypeService, 
     private authService: AuthService, private authData: AuthUserData) { }

  ngOnInit(): void {
    this.createForm();
    if (this.id) {
      this.getData();
    } else {
      this.showPassword = true;
    }
    this.user = this.authData.getUserData();
  }

  close(): void {
    this.drawerRef.close();
  }

  getData() {
    this.commonService.showLoading();
    this.loading = true;
    this.loanTypeService.getById(this.id).subscribe(response => {
      this.requestForm.patchValue(response, { onlySelf: true });
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
      name: new FormControl(null, Validators.required),
    });
  }

  onFormSubmit() {
    if (this.requestForm.valid) {
      this.loading = true;
      this.commonService.showLoading();
      let formData = this.requestForm.value as LoanTypeModel;

      //create or edit plan
      if (this.id) {
        formData.id = this.id;
        formData.editedBy = `${this.user.firstName} ${this.user.lastName}`;
      } else {
        formData.createdBy = `${this.user.firstName} ${this.user.lastName}`;
      }

      let service = (this.id) ? this.loanTypeService.update(this.id, formData) : this.loanTypeService.post(formData);

      service.subscribe(response => {
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
      this.commonService.checkFormValidation(this.requestForm);
      this.commonService.showToastWarning("Validation Error. Please check the fields and try again");
    }
  }

}
