import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { RequestQueryParams, CommonService, AuthUserData } from 'src/app/shared';
import { LoanModel } from 'src/app/shared/models/loan-model';
import { LoanService } from 'src/app/shared/services/loan.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {

  dataList: LoanModel[] = [];
  pageQuery: RequestQueryParams = new RequestQueryParams();
  // pagination: PagedList<LoanModel> = new PagedList<LoanModel>();
  checked = false;
  loading = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  onlyActive: boolean;

  constructor(
    private commonService: CommonService,
    private loanService: LoanService,
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
    this.loanService.getAll().subscribe(
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

  pageChanged(params: NzTableQueryParams): void {
    // console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    this.pageQuery.pageNumber = pageIndex; // || this.pageQuery.pageNumber;
    this.pageQuery.pageSize = pageSize; // || this.pageQuery.pageSize;

    this.getData();
  }

}
