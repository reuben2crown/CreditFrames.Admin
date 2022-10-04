import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs';
import { AuthTokenModel, AuthUserData, CommonService, CountryModel, CountryService, LenderService, LenderModel, StateService, LoanFeatureModel, LoanTypeModel, LenderLoanType, LoanTypeService, LoanFeatureService, StateModel, FormHelper, LenderFeatureItemModel } from 'src/app/shared';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { LenderLoantypeFormComponent } from '../lender-loantype-form/lender-loantype-form.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-lender-form',
  templateUrl: './lender-form.component.html',
  styleUrls: ['./lender-form.component.scss']
})
export class LenderFormComponent implements OnInit, OnDestroy {
  id: number;
  requestForm: FormGroup;
  formData: LenderModel;
  loanTypeList: LoanTypeModel[] = [];
  loanFeatureList: LoanFeatureModel[] = [];
  countryList: CountryModel[] = [];
  stateList: StateModel[] = [];
  private routeSub: Subscription;
  loading: boolean;
  user: AuthTokenModel;
  logoUrl: SafeResourceUrl | string;
  logoUpload: File;
  selectedCountry: CountryModel;
  lenderLoanTypes: LenderLoanType[] = [];

  constructor(private route: ActivatedRoute, private commonService: CommonService, private authData: AuthUserData, private lenderService: LenderService, private loanTypeService: LoanTypeService, private loanFeatureService: LoanFeatureService, private countryService: CountryService, private stateService: StateService, private drawerService: NzDrawerService, private formHelper: FormHelper, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = Number(params['id']);
      if (this.id) {
        this.getData();
      }
    });
    this.user = this.authData.getUserData();

    this.createForm();
    this.getDependencies();
  }

  createForm() {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.requestForm = new FormGroup({
      lenderName: new FormControl(null, Validators.required),
      description: new FormControl('', [Validators.maxLength(1000)]),
      emailAddress: new FormControl(null, [Validators.email]),
      phoneNumber: new FormControl(null),
      website: new FormControl(null, [Validators.required, Validators.pattern(reg)]),
      loanApplicationUrl: new FormControl(null, [Validators.pattern(reg)]),
      countryId: new FormControl(0, Validators.required),
      stateId: new FormControl(0),
      hasWebApp: new FormControl(false),
      hasMobileApp: new FormControl(false),
      facebookUrl: new FormControl(null, [Validators.pattern(`^.*(?:facebook\.com|fb\.me).*$`)]),
      twitterUrl: new FormControl(null, [Validators.pattern(`^.*(?:twitter\.com).*$`)]),
      instagramUrl: new FormControl(null, [Validators.pattern(`^.*(?:instagram\.com).*$`)]),
      linkedinUrl: new FormControl(null, [Validators.pattern(`^.*(?:linkedin\.com\/in\/|\/company\/).*$`)]),
      isActive: new FormControl(true),
      apiActivated: new FormControl(false),
      averageRating: new FormControl(0),
      loanTypes: new FormArray([]),
      lenderFeatures: new FormControl([]),
    });

    if (this.formData) {
      setTimeout(() => {
        this.requestForm.patchValue(this.formData, { onlySelf: true });
      }, 1);
    }
  }

  expandSet = new Set<any>();
  onExpandChange(id: any, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  changeCountry(value: string) {
    if (value) {
      this.selectedCountry = this.countryList.find(x => x.id == Number(value));
    }
  }

  getData() {
    this.commonService.showLoading();
    this.loading = true;
    this.lenderService.getById(this.id).subscribe(response => {
      this.formData = response;
      setTimeout(() => {
        this.requestForm.patchValue(response, { onlySelf: true });
        this.requestForm.patchValue({ lenderFeatures: response.features.map(x => x.featureName) || [] }, { onlySelf: true });
      }, 1);
      this.logoUrl = response?.logo;
      this.lenderLoanTypes = response.loanTypes;
      this.loading = false;
      this.commonService.hideLoading();
    }, error => {
      this.loading = false;
      this.commonService.handleError(error);
    });
  }

  getDependencies() {
    // loan types
    this.loanTypeService.getAll().subscribe(results => {
      this.loanTypeList = results || [];
    },
      (error) => {
        this.commonService.handleError(error);
      });

    // loan features
    this.loanFeatureService.getAll().subscribe(results => {
      this.loanFeatureList = results;
    },
      (error) => {
        this.commonService.handleError(error);
      });

    // loan countries
    this.countryService.getAll().subscribe(results => {
      this.countryList = results || [];
    },
      (error) => {
        this.commonService.handleError(error);
      });

    // loan states
    this.stateService.getAll().subscribe(results => {
      this.stateList = results || [];
    },
      (error) => {
        this.commonService.handleError(error);
      });
  }

  submitForm() {
    if (this.requestForm.valid) {
      this.loading = true;
      this.commonService.showLoading();
      let formValue = this.requestForm.value as LenderModel;

      var featureValues = this.requestForm.get('lenderFeatures').value as string[]; // LenderFeatureItemModel
      // if (featureValues && featureValues?.length) {
      //   var selectedFeatures = this.loanFeatureList.filter(x => featureValues.includes(x.name))
      //   .map(item => ({
      //     featureId: item.id,
      //     featureName: item.name,
      //     isSelected: true
      //   })) as LenderFeatureItemModel[] || [];

      //   formValue.features = selectedFeatures;
      // }

      formValue.features = featureValues || [];
      formValue.loanTypes = this.lenderLoanTypes;

      //create or edit plan
      if (this.id) {
        formValue.id = this.id;
        formValue.lastModifiedBy = `${this.user.firstName} ${this.user.lastName}`;
      } else {
        formValue.createdBy = `${this.user.firstName} ${this.user.lastName}`;
      }

      var formData = this.formHelper.createFormData(formValue);
      if (this.id) {
        formData.append('updatedBy', formValue.lastModifiedBy);
      }

      if (this.logoUpload) {
        formData.append('logoUpload', this.logoUpload);
      }

      let service = (this.id) ? this.lenderService.update(this.id, formData) : this.lenderService.create(formData);

      service.subscribe(response => {
        this.loading = false;
        if (response.ok) {
          this.commonService.hideLoading();
          if (response.body.status) {
            this.commonService.showToastSuccess(response.body.message);
            this.router.navigate(['/lenders']);
          } else {
            this.commonService.showToastError(response.body.message);
          }
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

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isValidImage = file.type === 'image/jpeg' || file.type === 'image/png' || 'image/svg+xml' || 'image/gif';
      if (!isValidImage) {
        this.commonService.showMessage('You can only upload JPEG, PNG, GIF or SVG file!');
        observer.complete();
        return;
      }
      const hasValidSize = file.size! / 1024 / 1024 < 5;
      if (!hasValidSize) {
        this.commonService.showMessage('Image must smaller than 5MB!');
        observer.complete();
        return;
      }
      observer.next(isValidImage && hasValidSize);
      observer.complete();
      return;
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(input: NzUploadChangeParam): void {
    if (input.file.originFileObj) {
      this.logoUpload = input.file.originFileObj;
      // console.log(this.logoUpload);
      this.getBase64(input.file!.originFileObj!, (img: string) => {
        this.logoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(img);
      });
    }
  }

  removeLoanType(item: LenderLoanType) {
    if (item) {
      if (!item.id) {
        var index = this.lenderLoanTypes.findIndex(x => x.id == item.id);
        if (index > -1) {
          this.lenderLoanTypes.splice(index, 1);
          this.commonService.showToastSuccess(`${item.loanTypeName} was removed.`);
        }
      }
      else {
        this.commonService.showLoading('Delete in progress..');
        this.lenderService.removeLoanType(item.id).subscribe(
          result => {
            if (result && result.status) {
              var index = this.lenderLoanTypes.indexOf(item);
              this.lenderLoanTypes.splice(index, 1);
              this.commonService.showToastSuccess(result.message);
            } else {
              this.commonService.showToastError(result.message);
            }
            this.commonService.hideLoading();
          },
          error => {
            this.commonService.hideLoading();
            this.commonService.handleError(error);
          }
        );
      }
    }
  }

  openLoanTypeForm(data?: LenderLoanType) {
    var formType = (data) ? 'Edit' : 'Add';
    const drawerRef = this.drawerService.create<LenderLoantypeFormComponent, { result: LenderLoanType }, LenderLoanType>({
      nzTitle: `${formType} Loan Type`,
      nzContent: LenderLoantypeFormComponent,
      nzWidth: 500,
      nzClosable: true,
      nzMaskClosable: false,
      nzCloseOnNavigation: true,
      nzContentParams: {
        data: data,
        id: data?.id,
        lenderId: data?.lenderId,
        loanTypeList: this.loanTypeList,
        selectedCountry: this.selectedCountry
      }
    });

    drawerRef.afterClose.subscribe(result => {
      if (result) {
        var index = (result.id) ? this.lenderLoanTypes.findIndex(x => x.id == result.id) : this.lenderLoanTypes.findIndex(x => x.loanTypeId == result.loanTypeId);

        if (index > -1) {
          this.lenderLoanTypes.splice(index, 1, result);
        } else {
          this.lenderLoanTypes.push(result);
        }
      }
    });
  }
}
