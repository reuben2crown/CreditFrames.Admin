import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared';
import { LenderModel } from 'src/app/shared/models/lender-model';
import { LoanFeatureModel } from 'src/app/shared/models/loan-feature-model';
import { LoanTypeModel } from 'src/app/shared/models/loan-type-model';
import { LoanFeatureService } from 'src/app/shared/services/loan-feature.service';
import { LoanTypeService } from 'src/app/shared/services/loan-type.service';

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
  private routeSub: Subscription;

  constructor(private route: ActivatedRoute, private commonService: CommonService, private loanTypeService: LoanTypeService, private loanFeatureService: LoanFeatureService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = Number(params['id']);
    });

    this.createForm();
    this.getLoanTypesAndFeatures();
  }

  createForm() {
    this.requestForm = new FormGroup({
      lenderName: new FormControl(null, Validators.required),
      description: new FormControl(''),
      emailAddress: new FormControl(null),
      phoneNumber: new FormControl(null),
      // logo: new FormControl(null, Validators.required),
      website: new FormControl(''),
      countryId: new FormControl(0, Validators.required),
      stateId: new FormControl(0),
      address: new FormControl(''),
      city: new FormControl(''),
      hasWebApp: new FormControl(false),
      hasMobileApp: new FormControl(false),
      minimumLoanAmount: new FormControl(0),
      maximumLoanAmount: new FormControl(0),
      turnAroundTimeInMinute: new FormControl(0),
      eligiblityCriteria: new FormControl(),
      facebookUrl: new FormControl(),
      twitterUrl: new FormControl(),
      linkedinUrl: new FormControl(),
      loanTypes: new FormArray([]),
      features: new FormArray([]),
    });
  }

  addLoanTypes(loanType: LoanTypeModel) {
    if (loanType) {
      
    }
  }

  getLoanTypesAndFeatures() {
    // loan types
    this.loanTypeService.getAll().subscribe(results => {
      this.loanTypeList = results || [];
    },
    (error) => {
      this.commonService.handleError(error);
    });

    // loan features
    this.loanFeatureService.getAll().subscribe(results => {
      this.loanFeatureList = results || [];
    },
    (error) => {
      this.commonService.handleError(error);
    });
  }

  submitForm() {
    if (this.requestForm.valid) {
      console.log('submit', this.requestForm.value);
    } else {
      Object.values(this.requestForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
