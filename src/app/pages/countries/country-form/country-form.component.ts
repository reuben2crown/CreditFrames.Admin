import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { AuthTokenModel, DataResponseModel, CountryModel, CommonService, CountryService, AuthService, AuthUserData } from 'src/app/shared';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss']
})
export class CountryFormComponent implements OnInit {
  @Input() id: number;
  requestForm: FormGroup;
  user: AuthTokenModel;
  loading: boolean;
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: DataResponseModel<CountryModel> };
    drawerRef: NzDrawerRef<DataResponseModel<CountryModel>>;
  }>;

  @Input() data: CountryModel;

  constructor(
    private drawerRef: NzDrawerRef<any>, 
    public router: Router, private commonService: CommonService,
     private loanTypeService: CountryService, private authData: AuthUserData) { }

  ngOnInit(): void {
    this.createForm();
    if (this.id) {
      this.getData();
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
      id: new FormControl(this.data?.id || 0),
      name: new FormControl(this.data?.name, Validators.required),
      code: new FormControl(this.data?.code, Validators.required),
      currencyCode: new FormControl(this.data?.currencyCode, Validators.required),
      unicode: new FormControl(this.data?.unicode),
      isActive: new FormControl(this.data?.isActive || true, Validators.required)      
    });
  }

  onFormSubmit() {
    if (this.requestForm.valid) {
      this.loading = true;
      this.commonService.showLoading();
      let formData = this.requestForm.value as CountryModel;

      //create or edit plan
      if (this.id) {
        formData.id = this.id;
        formData.lastModifiedBy = `${this.user.firstName} ${this.user.lastName}`;
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
