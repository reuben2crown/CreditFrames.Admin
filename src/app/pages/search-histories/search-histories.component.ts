import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { RequestQueryParams, CommonService, AuthUserData, PagedList } from 'src/app/shared';
import { SearchHistoryModel } from 'src/app/shared/models/search-history-model';
import { SearchHistoryService } from 'src/app/shared/services/search-history.service';

@Component({
  selector: 'app-search-histories',
  templateUrl: './search-histories.component.html',
  styleUrls: ['./search-histories.component.scss']
})
export class SearchHistoriesComponent implements OnInit {
  dataList: SearchHistoryModel[] = [];
  pageQuery: RequestQueryParams = new RequestQueryParams();
  pagination: PagedList<SearchHistoryModel> = new PagedList<SearchHistoryModel>();
  checked = false;
  loading = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  onlyActive: boolean;
  constructor(
    private commonService: CommonService,
    private searchHistoryService: SearchHistoryService
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
    this.searchHistoryService.getPaged(this.pageQuery).subscribe(
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

  pageChanged(params: NzTableQueryParams): void {
    // console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    this.pageQuery.pageNumber = pageIndex; // || this.pageQuery.pageNumber;
    this.pageQuery.pageSize = pageSize; // || this.pageQuery.pageSize;

    this.getData();
  }

  download(exportType: string) {
    this.commonService.showLoading();
    this.searchHistoryService.export(this.pageQuery, exportType).subscribe(result => {
      this.commonService.hideLoading();
      const extension = (exportType == 'csv') ? 'csv' : (exportType == 'excel') ? 'xlsx' : 'json';
      const mimeType = (extension == 'csv') ? 'text/csv' : (extension == 'xlsx') ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'application/json';
      const fileName = "SearchHistories-" + new Date().getTime() + `.${extension}`;
      this.commonService.exportFromApi(fileName, result, mimeType);
      this.commonService.showToastSuccess("Your download is starting soon...");
    },
      error => {
        this.commonService.handleError(error);
      }
    );
  }

}
