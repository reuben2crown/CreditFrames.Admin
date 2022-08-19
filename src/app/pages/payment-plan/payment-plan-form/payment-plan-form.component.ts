import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { AuthService, AuthTokenModel, AuthUserData, ChannelEnum, CommonService, DataResponseModel, PaymentPlanFormModel, PaymentPlanModel, PaymentPlanService } from 'src/app/shared';

@Component({
  selector: 'app-payment-plan-form',
  templateUrl: './payment-plan-form.component.html',
  styleUrls: ['./payment-plan-form.component.scss']
})
export class PaymentPlanFormComponent implements OnInit {
  @Input() id: number;
  requestForm: FormGroup;
  user: AuthTokenModel;
  showPassword: boolean;
  loading: boolean;
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: DataResponseModel<PaymentPlanModel> };
    drawerRef: NzDrawerRef<DataResponseModel<PaymentPlanModel>>;
  }>;

  @Input() data: PaymentPlanModel;

  constructor(private drawerRef: NzDrawerRef<any>, public router: Router, private commonService: CommonService, private paymentPlanService: PaymentPlanService, private authService: AuthService, private authData: AuthUserData) { }

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
    this.paymentPlanService.getById(this.id).subscribe(response => {
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
      title: new FormControl(null, Validators.required),
      noOfConsultation: new FormControl(1, [Validators.required, Validators.min(1)]),
      durationInMonth: new FormControl(1, [Validators.required, Validators.min(1)]),
      amount: new FormControl(0, [
        Validators.required,
        Validators.pattern('[0-9][0-9]*([.][0-9][0-9]?)?'),
      ]),
      isActive: new FormControl(true)
    });
  }

  onFormSubmit() {
    if (this.requestForm.valid) {
      this.loading = true;
      this.commonService.showLoading();
      let formData = this.requestForm.value as PaymentPlanFormModel;

      //create or edit plan
      if (this.id) {
        formData.id = this.id;
        formData.editedBy = `${this.user.firstName} ${this.user.lastName}`;
      } else {
        formData.createdBy = `${this.user.firstName} ${this.user.lastName}`;
      }

      let service = (this.id) ? this.paymentPlanService.update(this.id, formData) : this.paymentPlanService.post(formData);

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
