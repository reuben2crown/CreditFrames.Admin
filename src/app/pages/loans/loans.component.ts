import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { RequestQueryParams, PagedList, CommonService, AuthUserData, DataResponseModel, LoanModel, LoanService } from 'src/app/shared';
import { format, startOfMonth, startOfYesterday, endOfYesterday, startOfToday, endOfToday } from 'date-fns';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  dataList: LoanModel[] = [];
  pageQuery: RequestQueryParams = new RequestQueryParams();
  pagination: PagedList<LoanModel> = new PagedList<LoanModel>();
  loading = false;

  dateRange = { Yesterday: [startOfYesterday(), endOfYesterday()], Today: [startOfToday(), endOfToday()], 'This Month': [startOfMonth(new Date()), new Date()] };

  constructor(
    private commonService: CommonService,
    private loanService: LoanService,
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

  clear() {
    this.pageQuery = new RequestQueryParams();
    this.pagination = new PagedList<LoanModel>();
  }

  getData() {
    this.loading = true;
    this.loanService.getPaged(this.pageQuery).subscribe(
      result => {
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

  viewDetails(data: LoanModel) {
    const drawerRef = this.drawerService.create<LoanDetailComponent, { result: DataResponseModel<LoanModel> }, DataResponseModel<LoanModel>>({
      nzTitle: `Loan Details`,
      nzContent: LoanDetailComponent,
      nzWidth: 900,
      nzClosable: true,
      nzCloseOnNavigation: true,
      nzContentParams: {
        data: data
      }
    });

    drawerRef.afterClose.subscribe(response => {
      if (response && response.status && response.data) {
        var index = this.dataList.findIndex(x => x.id == response.data.id);        
        if (index > -1) {
          this.dataList.splice(index, 1, response.data);
        }
      }
    });
  }

  download(exportType: string) {
    this.commonService.showLoading();
    this.loanService.export(this.pageQuery, exportType).subscribe(result => {
      this.commonService.hideLoading();
      const extension = (exportType == 'csv') ? 'csv' : (exportType == 'excel') ? 'xlsx' : 'json';
      const mimeType = (extension == 'csv') ? 'text/csv' : (extension == 'xlsx') ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'application/json';
      const fileName = "Loans-" + new Date().getTime() + `.${extension}`;
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

}
