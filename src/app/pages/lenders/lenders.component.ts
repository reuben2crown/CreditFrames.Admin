import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { RequestQueryParams, PagedList, CommonService, AuthUserData, LenderService, CountryService, CountryModel } from 'src/app/shared';
import { LenderModel } from 'src/app/shared/models/lender-model';
import { format, startOfMonth, startOfYesterday, endOfYesterday, startOfToday, endOfToday } from 'date-fns';

@Component({
  selector: 'app-lenders',
  templateUrl: './lenders.component.html',
  styleUrls: ['./lenders.component.scss']
})
export class LendersComponent implements OnInit {
  dataList: LenderModel[] = [];
  countryList: CountryModel[] = [];
  pageQuery: RequestQueryParams = new RequestQueryParams();
  pagination: PagedList<LenderModel> = new PagedList<LenderModel>();
  checked = false;
  loading = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();

  menu: any;

  dateRange = { Yesterday: [startOfYesterday(), endOfYesterday()], Today: [startOfToday(), endOfToday()], 'This Month': [startOfMonth(new Date()), new Date()] };

  constructor(
    private commonService: CommonService,
    private authData: AuthUserData,
    private lenderService: LenderService,
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.getData();
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
    this.pagination = new PagedList<LenderModel>();
  }

  getData() {
    this.loading = true;
    this.lenderService.getPaged(this.pageQuery).subscribe(
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

  getCountires() {
    this.loading = true;
    this.countryService.getAll(true).subscribe(
      result => {
        this.countryList = result || [];
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.commonService.handleError(error);
      }
    );
  }

  download(exportType: string) {
    this.commonService.showLoading();
    this.lenderService.export(this.pageQuery, exportType).subscribe(result => {
      this.commonService.hideLoading();
      const extension = (exportType == 'csv') ? 'csv' : (exportType == 'excel') ? 'xlsx' : 'json';
      const mimeType = (extension == 'csv') ? 'text/csv' : (extension == 'xlsx') ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'application/json';
      const fileName = "Lenders-" + new Date().getTime() + `.${extension}`;
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

  delete(item: LenderModel) {
    this.commonService.showLoading('Delete in progress..');
    this.lenderService.delete(item.id).subscribe(
      result => {
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
}
