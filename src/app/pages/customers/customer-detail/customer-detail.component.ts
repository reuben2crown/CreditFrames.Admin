import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonService, LoanModel, LoanService, PagedList, RequestQueryParams, SearchHistoryModel, SearchHistoryService, UserModel } from 'src/app/shared';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
  providers: [DatePipe]
})
export class CustomerDetailComponent implements OnInit {
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;

  @Input() data: UserModel;
  searchHistory: SearchHistoryModel[] = [];
  loanHistory: LoanModel[] = [];
  loading: boolean;
  pageQuery: RequestQueryParams = new RequestQueryParams();
  pagination: PagedList<any> = new PagedList<any>();
  tabIndex: number;
  
  constructor(private drawerRef: NzDrawerRef<any>, private commonService: CommonService,
    private loanService: LoanService, private searchHistoryService: SearchHistoryService) {}

  close(): void {
    this.drawerRef.close();
  }

  ngOnInit(): void {

  }

  getLoans() {
    this.loading = true;
    this.loanService.getByUser(this.data.id, this.pageQuery).subscribe(
      result => {
        this.pagination = result;
        this.loanHistory = result.items || [];
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.commonService.handleError(error);
      }
    );
  }

  getSearchHistory() {
    this.loading = true;
    this.searchHistoryService.getByUser(this.data.id, this.pageQuery).subscribe(
      result => {
        this.pagination = result;
        this.searchHistory = result.items || [];
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.commonService.handleError(error);
      }
    );
  }

  tabChanged(index) {
    this.searchHistory = [];
    this.loanHistory = [];
    this.loading = true;
    this.pageQuery = new RequestQueryParams();
    this.pagination = new PagedList<any>();
    this.tabIndex = index;
    if (index == 1) {
      this.getSearchHistory();
    }
    if (index == 2) {
      this.getLoans();
    }
  }
  
  pageChanged(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    this.pageQuery.pageNumber = pageIndex; // || this.pageQuery.pageNumber;
    this.pageQuery.pageSize = pageSize; // || this.pageQuery.pageSize;
    if (!this.pageQuery.pageNumber) {
      // this.pageQuery.pageNumber = 1;
      if (this.tabIndex == 1) {
        this.getSearchHistory();
      }
      if (this.tabIndex == 2) {
        this.getLoans();
      }
    }
  }

}
