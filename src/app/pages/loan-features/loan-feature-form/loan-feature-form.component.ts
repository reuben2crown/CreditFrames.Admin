import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { AuthService, AuthTokenModel, AuthUserData, ChannelEnum, CommonService, DataResponseModel } from 'src/app/shared';
import { LoanFeatureModel } from 'src/app/shared/models/loan-feature-model';
import { LoanFeatureService } from 'src/app/shared/services/loan-feature.service';

@Component({
  selector: 'app-loan-feature-form',
  templateUrl: './loan-feature-form.component.html',
  styleUrls: ['./loan-feature-form.component.scss']
})
export class LoanFeatureFormComponent implements OnInit {
  @Input() id: number;
  requestForm: FormGroup;
  user: AuthTokenModel;
  showPassword: boolean;
  loading: boolean;
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: DataResponseModel<LoanFeatureModel> };
    drawerRef: NzDrawerRef<DataResponseModel<LoanFeatureModel>>;
  }>;

  @Input() data: LoanFeatureModel;

  constructor(private drawerRef: NzDrawerRef<any>,
    public router: Router,
    private commonService: CommonService,
    private loanFeatureService: LoanFeatureService,
    private authService: AuthService,
    private authData: AuthUserData) { }

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
    this.loanFeatureService.getById(this.id).subscribe(response => {
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
      isActive: new FormControl(true)
    });
  }

  onFormSubmit() {
    if (this.requestForm.valid) {
      this.loading = true;
      this.commonService.showLoading();
      let formData = this.requestForm.value as LoanFeatureModel;

      //create or edit plan
      if (this.id) {
        formData.id = this.id;
        formData.updatedBy = `${this.user.firstName} ${this.user.lastName}`;
      } else {
        formData.createdDate = `${this.user.firstName} ${this.user.lastName}`;
      }

      let service = (this.id) ? this.loanFeatureService.update(this.id, formData) : this.loanFeatureService.post(formData);

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
