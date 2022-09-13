import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { DataResponseModel, CommonService, AuthService, AuthUserData, AuthTokenModel } from 'src/app/shared';
import { CountryFormModel, CountryModel } from 'src/app/shared/models/country-model';
import { CountryService } from 'src/app/shared/services/country.service';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';


@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss']
})
export class CountryFormComponent implements OnInit {
  @Input() id: number;
  requestForm: FormGroup;
  user: AuthTokenModel;
  showPassword: boolean;
  loading: boolean;
  fileList: NzUploadFile[] = [
    {
      uid: '-1',
      name: 'NGNF-flag.png',
      status: 'done',
      url: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NG.svg'
    }
  ];

  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: DataResponseModel<CountryModel> };
    drawerRef: NzDrawerRef<DataResponseModel<CountryModel>>;
  }>;

  @Input() data: CountryModel;


  constructor(private drawerRef: NzDrawerRef<any>,
    public router: Router,
    private commonService: CommonService,
    private countryService: CountryService,
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
    this.countryService.getById(this.id).subscribe(response => {
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
      // name: new FormControl(null, Validators.required),
      // code: new FormControl(null, Validators.required),
      // currencyCode: new FormControl(null, [Validators.required, Validators.min(3)]),
      // flagUrl: new FormControl([Validators.required]),
      // unicode: new FormControl(null, [Validators.required]),
      isActive: new FormControl(true)
    });
  }

  onFormSubmit() {
    if (this.requestForm.valid) {
      this.loading = true;
      this.commonService.showLoading();
      let formData = this.requestForm.value as CountryFormModel;

      //create or edit plan
      if (this.id) {
        formData.id = this.id;
        formData.editedBy = `${this.user.firstName} ${this.user.lastName}`;
      } else {
        formData.createdBy = `${this.user.firstName} ${this.user.lastName}`;
      }

      let service = (this.id) ? this.countryService.update(this.id, formData) : this.countryService.post(formData);

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

  handleChange(info: NzUploadChangeParam): void {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.fileList = fileList;
  }
}

