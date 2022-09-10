import { Component, OnInit } from '@angular/core';

import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { RequestQueryParams, CommonService, AuthUserData, DataResponseModel } from 'src/app/shared';
import { LoanFeatureModel } from 'src/app/shared/models/loan-feature-model';
import { LoanFeatureService } from 'src/app/shared/services/loan-feature.service';
import { LoanFeatureFormComponent } from './loan-feature-form/loan-feature-form.component';


@Component({
  selector: 'app-loan-features',
  templateUrl: './loan-features.component.html',
  styleUrls: ['./loan-features.component.scss']
})
export class LoanFeaturesComponent implements OnInit {
  dataList: LoanFeatureModel[] = [];
  pageQuery: RequestQueryParams = new RequestQueryParams();
  // pagination: PagedList<PaymentPlanModel> = new PagedList<PaymentPlanModel>();
  checked = false;
  loading = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  onlyActive: boolean;

  constructor(
    private commonService: CommonService,
    private loanFeatureService: LoanFeatureService,
    private authData: AuthUserData,
    private drawerService: NzDrawerService
  ) { }

  ngOnInit(): void {
     this.getData();
  }
  search() {
    this.pageQuery.pageNumber = 1;
    this.getData();
  }

  getData() {
    this.loading = true;
    this.loanFeatureService.getAll(this.onlyActive).subscribe(
      result => {
        // this.pagination = result;
        this.dataList = result || [];
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.commonService.handleError(error);
      }
    );
  }

  openForm(data?: LoanFeatureModel) {
    var formType = (data) ? 'Edit' : 'Create';
    const drawerRef = this.drawerService.create<LoanFeatureFormComponent, { result: DataResponseModel<LoanFeatureModel> }, DataResponseModel<LoanFeatureModel>>({
      nzTitle: `${formType} Payment Plan Form`,
      nzContent: LoanFeatureFormComponent,
      nzWidth: 500,
      nzClosable: true,
      nzCloseOnNavigation: true,
      nzContentParams: {
        data: data,
        id: data?.id
      }
    });
  }

  pageChanged(params: NzTableQueryParams): void {
    // console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    this.pageQuery.pageNumber = pageIndex; // || this.pageQuery.pageNumber;
    this.pageQuery.pageSize = pageSize; // || this.pageQuery.pageSize;
    
    this.getData();
  }

  delete(item: LoanFeatureModel) {
    this.commonService.showLoading();
    this.loanFeatureService.delete(item.id).subscribe(result => {
      if (result && result.status) {
        var index = this.dataList.indexOf(item);
        this.dataList.splice(index, 1);
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

  deleteMany() {

  }
}
