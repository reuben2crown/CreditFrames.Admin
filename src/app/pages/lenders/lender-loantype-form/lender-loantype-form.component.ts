import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { AuthTokenModel, AuthUserData, CommonService, CountryModel, LenderService, LoanRequirementEnum, LoanRequirementLabel, LoanSecurityEnum } from 'src/app/shared';
import { LenderLoanType } from 'src/app/shared/models/lender-model';
import { LoanTypeModel } from 'src/app/shared/models/loan-type-model';

@Component({
  selector: 'app-lender-loantype-form',
  templateUrl: './lender-loantype-form.component.html',
  styleUrls: ['./lender-loantype-form.component.scss']
})
export class LenderLoantypeFormComponent implements OnInit {
  @Input() id: number;
  @Input() lenderId: number;
  @Input() data: LenderLoanType;
  @Input() selectedCountry: CountryModel;  
  loanTypeForm: FormGroup;
  user: AuthTokenModel;
  loading: boolean;
  loanTypeList: LoanTypeModel[] = [];
  loanSecurityEnum: typeof LoanSecurityEnum = LoanSecurityEnum;
  loanRequirementEnum: typeof LoanRequirementEnum = LoanRequirementEnum;

  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: LenderLoanType };
    drawerRef: NzDrawerRef<LenderLoanType>;
  }>;


  constructor(private drawerRef: NzDrawerRef<any>, private lenderService: LenderService, private commonService: CommonService, private authData: AuthUserData) { }

  ngOnInit(): void {
    this.createForm();
    if (this.data && this.data.id) {
      this.getData();
    }
    this.user = this.authData.getUserData();
  }

  getDisplayName(input: LoanRequirementEnum | string | any) {
    if (input) {
      return LoanRequirementLabel.get(input);
    }
    
    return null;
  }

  close(): void {
    this.drawerRef.close();
  }

  getData() {
    this.commonService.showLoading();
    this.loading = true;
    this.lenderService.getLenderLoanType(this.id).subscribe(response => {
      this.loanTypeForm.patchValue(response, { onlySelf: true });
      this.loading = false;
      this.commonService.hideLoading();
    }, error => {
      this.loading = false;
      this.commonService.handleError(error);
    });
  }

  createForm(): void {
    this.loanTypeForm = new FormGroup({
      id: new FormControl(this.data?.id || 0),
      lenderId: new FormControl(this.data?.lenderId || this.lenderId || 0), //, Validators.required
      loanTypeId: new FormControl(this.data?.loanTypeId || 0, Validators.required),
      loanTypeName: new FormControl(this.data?.loanTypeName),
      minimumLoanAmount: new FormControl(this.data?.minimumLoanAmount || 0, Validators.required),
      maximumLoanAmount: new FormControl(this.data?.maximumLoanAmount || 0, Validators.required),
      returnCustomerAmount: new FormControl(this.data?.returnCustomerAmount || 0),
      minimumInterestRate: new FormControl(this.data?.minimumInterestRate || 0, Validators.required),
      maximumInterestRate: new FormControl(this.data?.maximumInterestRate || 0, Validators.required),
      minimumLoanTenor: new FormControl(this.data?.minimumLoanTenor || 0, Validators.required),
      maximumLoanTenor: new FormControl(this.data?.maximumLoanTenor || 0, Validators.required),
      moratoriumPeriod: new FormControl(this.data?.moratoriumPeriod || 0),
      minTurnAroundTimeInMinute: new FormControl(this.data?.minTurnAroundTimeInMinute || 0, Validators.required),
      maxTurnAroundTimeInMinute: new FormControl(this.data?.maxTurnAroundTimeInMinute || 0, Validators.required),
      requirements: new FormControl(this.data?.requirements),
      eligiblityCriteria: new FormControl(this.data?.eligiblityCriteria),
      security: new FormControl(this.data?.security, Validators.required),
    });
  }

  timeConvert(input) {
    return this.commonService.convertSecondsToDhms(input, 'Minutes');
  }

  addFormSubmit() {
    if (this.loanTypeForm.valid) {
      let formData = this.loanTypeForm.value as LenderLoanType;
      formData.loanTypeName = this.loanTypeList.find(x => x.id == formData.loanTypeId)?.name;

      //create or edit plan
      if (this.id) {
        formData.id = this.id;
        formData.lastModifiedBy = `${this.user.firstName} ${this.user.lastName}`;
      } else {
        formData.createdBy = `${this.user.firstName} ${this.user.lastName}`;
      }

      this.drawerRef.close(formData);
    } else {
      this.commonService.checkFormValidation(this.loanTypeForm);
      this.commonService.showToastWarning("Validation Error. Please check the fields for errors and try again");
    }
  }
}
