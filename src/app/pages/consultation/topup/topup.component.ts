import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonService, ConsultationService, AuthService, AuthUserData, ChannelEnum, AuthTokenModel, DurationTypeEnum } from 'src/app/shared';

@Component({
  selector: 'app-topup',
  templateUrl: './topup.component.html',
  styleUrls: ['./topup.component.scss']
})
export class TopupComponent implements OnInit {
  loading: boolean;
  requestForm: FormGroup;
  user: AuthTokenModel;
  durationType: typeof DurationTypeEnum = DurationTypeEnum;

  constructor(private modalRef: NzModalRef, public router: Router, private commonService: CommonService, private consultationService: ConsultationService, private authService: AuthService, private authData: AuthUserData) {}

  ngOnInit(): void {
    this.user = this.authData.getUserData();
    this.createForm();
  }
  
  closeModal(): void {
    this.modalRef.destroy();
  }

  createForm(): void {
    this.requestForm = new FormGroup({
      phoneNumber: new FormControl(null, Validators.required),
      noOfConsultation: new FormControl(1, [Validators.required, Validators.min(1)]),
      duration: new FormControl(1, [Validators.required, Validators.min(1)]),
      durationType: new FormControl('Month', Validators.required),
      reason: new FormControl()
    });
  }

  onFormSubmit() {
    if (this.requestForm.valid) {
      this.loading = true;
      this.commonService.showLoading();
      let formData = this.requestForm.value;
      formData.adminUserId = this.user.userId;
      formData.channel = ChannelEnum.Admin;

      this.consultationService.topup(formData).subscribe(response => {
        this.loading = false;
        this.commonService.hideLoading();
        if (response.status) {
          this.commonService.showToastSuccess(response.message);
          this.modalRef.close(response);
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
