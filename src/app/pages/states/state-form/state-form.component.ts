import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { AuthTokenModel, DataResponseModel, CommonService, StateService, AuthService, AuthUserData, CountryModel } from 'src/app/shared';
import { StateModel } from 'src/app/shared/models/state-model';

@Component({
  selector: 'app-state-form',
  templateUrl: './state-form.component.html',
  styleUrls: ['./state-form.component.scss']
})
export class StateFormComponent implements OnInit {
  @Input() id: number;
  @Input() countryId: number;
  requestForm: FormGroup;
  user: AuthTokenModel;
  loading: boolean;
  @Input() countryList: CountryModel[] = [];

  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: DataResponseModel<StateModel> };
    drawerRef: NzDrawerRef<DataResponseModel<StateModel>>;
  }>;

  @Input() data: StateModel;

  constructor(
    private drawerRef: NzDrawerRef<any>,
    public router: Router, private commonService: CommonService,
    private loanTypeService: StateService, private authData: AuthUserData) { }

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
      code: new FormControl(this.data?.code),
      countryId: new FormControl(this.data?.countryId || this.countryId || 0, Validators.required),
      isActive: new FormControl(this.data?.isActive || true, Validators.required)
    });
  }

  onFormSubmit() {
    if (this.requestForm.valid) {
      this.loading = true;
      this.commonService.showLoading();
      let formData = this.requestForm.value as StateModel;

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
