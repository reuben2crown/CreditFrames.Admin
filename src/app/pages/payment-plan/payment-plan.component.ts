import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PaymentPlanModel, RequestQueryParams, CommonService, PaymentPlanService, AuthUserData, DataResponseModel } from 'src/app/shared';
import { PaymentPlanFormComponent } from './payment-plan-form/payment-plan-form.component';

@Component({
  selector: 'app-payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.scss']
})
export class PaymentPlanComponent implements OnInit {
  dataList: PaymentPlanModel[] = [];
  pageQuery: RequestQueryParams = new RequestQueryParams();
  // pagination: PagedList<PaymentPlanModel> = new PagedList<PaymentPlanModel>();
  checked = false;
  loading = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  onlyActive: boolean;

  constructor(
    private commonService: CommonService,
    private paymentPlanService: PaymentPlanService,
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
    this.paymentPlanService.getAll(this.onlyActive).subscribe(
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

  openForm(data?: PaymentPlanModel) {
    var formType = (data) ? 'Edit' : 'Create';
    const drawerRef = this.drawerService.create<PaymentPlanFormComponent, { result: DataResponseModel<PaymentPlanModel> }, DataResponseModel<PaymentPlanModel>>({
      nzTitle: `${formType} Payment Plan Form`,
      nzContent: PaymentPlanFormComponent,
      nzWidth: 500,
      nzClosable: true,
      nzCloseOnNavigation: true,
      nzContentParams: {
        data: data,
        id: data?.id
      }
    });

    drawerRef.afterOpen.subscribe(() => {
      // console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(response => {
      if (response && response.status) {
        if (response.data) {
          this.dataList.push(response.data);
        } else {
          this.getData();
        }
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


  delete(item: PaymentPlanModel) {
    this.commonService.showLoading();
    this.paymentPlanService.delete(item.id).subscribe(result => {
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
