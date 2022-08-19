import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PaymentModel, RequestQueryParams, PagedList, CommonService, AuthUserData, PaymentService } from 'src/app/shared';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { format, startOfMonth, startOfYesterday, endOfYesterday, startOfToday, endOfToday } from 'date-fns';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  providers: [DatePipe]
})
export class PaymentsComponent implements OnInit {
  dataList: PaymentModel[] = [];
  pageQuery: RequestQueryParams = new RequestQueryParams();
  pagination: PagedList<PaymentModel> = new PagedList<PaymentModel>();
  checked = false;
  loading = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();

  dateRange = { Yesterday: [startOfYesterday(), endOfYesterday()], Today: [startOfToday(), endOfToday()], 'This Month': [startOfMonth(new Date()), new Date()] };

  constructor(
    private commonService: CommonService,
    private paymentService: PaymentService,
    private authData: AuthUserData,
    private drawerService: NzDrawerService
  ) { }

  ngOnInit(): void {
  }

  onDateChange(date: Date[]): void {
    this.pageQuery.startDate = format(date[0], 'yyyy-MM-dd');
    this.pageQuery.endDate = format(date[1], 'yyyy-MM-dd');
  }

  search() {
    this.pageQuery.pageNumber = 1;
    this.getData();
  }

  getData() {
    this.loading = true;
    this.paymentService.getPaged(this.pageQuery).subscribe(result => {
        this.pagination = result;
        this.dataList = result.items || [];
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.commonService.handleError(error);
      }
    );
  }

  clear() {
    this.pageQuery = new RequestQueryParams();
    this.pagination = new PagedList<PaymentModel>();
  }

  showDetails(data: PaymentModel) {
    if (data) {
      const drawerRef = this.drawerService.create<PaymentDetailComponent, { value: string }, string>({
        nzTitle: 'Payment Details',
        nzContent: PaymentDetailComponent,
        nzWidth: 750,
        nzClosable: true,
        nzCloseOnNavigation: true,
        nzContentParams: {
          data: data,
        }
      });

      drawerRef.afterOpen.subscribe(() => {
        // console.log('Drawer(Component) open');
      });

      drawerRef.afterClose.subscribe(data => {
        // console.log(data);
        // if (typeof data === 'string') {
        //   this.value = data;
        // }
      });
    }
  }

  download(exportType: string, reportType: 'all' | 'report' | 'summary' = 'all') {
    this.commonService.showLoading();
    this.paymentService.export(this.pageQuery, exportType, reportType).subscribe(result => {
      this.commonService.hideLoading();
      const extension = (exportType == 'csv') ? 'csv' : (exportType == 'excel') ? 'xlsx' : 'json';
      const mimeType = (extension == 'csv') ? 'text/csv' : (extension == 'xlsx') ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'application/json';
      const fileName = "Payments-" + new Date().getTime() + `.${extension}`;
      this.commonService.exportFromApi(fileName, result, mimeType);
      this.commonService.showToastSuccess("Your download is starting soon...");
    },
      error => {
        this.commonService.handleError(error);
      }
    );
  }

  
  pageChanged(params: NzTableQueryParams): void {
    // console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    this.pageQuery.pageNumber = pageIndex; // || this.pageQuery.pageNumber;
    this.pageQuery.pageSize = pageSize; // || this.pageQuery.pageSize;
    
    this.getData();
  }


  verifyPayment(item: PaymentModel) {
    if (item) {
      this.loading = true;
      this.commonService.showLoading();
      var model = {
        referenceNumber: item.referenceNumber
      };
      this.paymentService.validate(model).subscribe(result => {
        if (result && result.status) {
          this.commonService.showToastSuccess(result.message);
          this.getData();
        } else {
          this.commonService.showToastError(result.message);
        }
        this.loading = false;
        this.commonService.hideLoading();
      },
        error => {
          this.loading = false;
          this.commonService.handleError(error);
        }
      );
    }
  }

  clearAbandonedPayments() {
    this.commonService.showLoading();
    this.loading = true;
    this.paymentService.clearAbandonedPayments().subscribe(result => {
      if (result && result.status) {
        this.commonService.showToastSuccess(result.message);
        this.getData();
      } else {
        this.commonService.showToastError(result.message);
      }
      this.loading = false;
      this.commonService.hideLoading();
    },
      error => {
        this.loading = false;
        this.commonService.handleError(error);
      }
    );
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    this.checked = this.dataList.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = this.dataList.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.dataList.forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.loading = true;
    const requestData = this.dataList.filter(data => this.setOfCheckedId.has(data.id));
    // console.log(requestData);
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);
  }
}
