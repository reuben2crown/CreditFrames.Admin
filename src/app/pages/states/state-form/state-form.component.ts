import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { AuthTokenModel, DataResponseModel, CommonService, AuthService, AuthUserData } from 'src/app/shared';
import { StateFormModel, StateModel } from 'src/app/shared/models/state-model';
import { StateService } from 'src/app/shared/services/state.service';

@Component({
  selector: 'app-state-form',
  templateUrl: './state-form.component.html',
  styleUrls: ['./state-form.component.scss']
})
export class StateFormComponent implements OnInit {

  @Input() id: number;
  requestForm: FormGroup;
  user: AuthTokenModel;
  showPassword: boolean;
  loading: boolean;
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: DataResponseModel<StateModel> };
    drawerRef: NzDrawerRef<DataResponseModel<StateModel>>;
  }>;

  @Input() data: StateModel;

  constructor(private drawerRef: NzDrawerRef<any>,
    public router: Router,
    private commonService: CommonService,
    private stateService: StateService,
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
    this.stateService.getById(this.id).subscribe(response => {
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
      code: new FormControl(null, [Validators.required, Validators.max(3)]),
    });
  }

  onFormSubmit() {
    if (this.requestForm.valid) {
      this.loading = true;
      this.commonService.showLoading();
      let formData = this.requestForm.value as StateFormModel;

      //create or edit plan
      if (this.id) {
        formData.id = this.id;
        formData.lastModifiedBy = `${this.user.firstName} ${this.user.lastName}`;
      } else {
        formData.createdBy = `${this.user.firstName} ${this.user.lastName}`;
      }

      let service = (this.id) ? this.stateService.update(this.id, formData) : this.stateService.post(formData);

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
