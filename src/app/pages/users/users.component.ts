import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { UserModel, RequestQueryParams, PagedList, CommonService, AuthUserData, UserService, DataResponseModel } from 'src/app/shared';
import { UserFormComponent } from './user-form/user-form.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { format, startOfMonth, startOfYesterday, endOfYesterday, startOfToday, endOfToday } from 'date-fns';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dataList: UserModel[] = [];
  pageQuery: RequestQueryParams = new RequestQueryParams();
  pagination: PagedList<UserModel> = new PagedList<UserModel>();
  checked = false;
  loading = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();

  dateRange = { Yesterday: [startOfYesterday(), endOfYesterday()], Today: [startOfToday(), endOfToday()], 'This Month': [startOfMonth(new Date()), new Date()] };

  constructor(
    private commonService: CommonService,
    private userService: UserService,
    private authData: AuthUserData,
    private drawerService: NzDrawerService,
    private nzMessageService: NzMessageService
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
    this.pagination = new PagedList<UserModel>();
  }

  getData() {
    // if (this.dataList.length && this.pagination.hasNext) {
    //   this.pageQuery.pageNumber = this.pageQuery.pageNumber + 1;
    // }
    this.loading = true;
    this.userService.getAdmins(this.pageQuery).subscribe(
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

  openForm(data?: UserModel) {
    var formType = (data) ? 'Edit' : 'Create';
    const drawerRef = this.drawerService.create<UserFormComponent, { result: DataResponseModel<UserModel> }, DataResponseModel<UserModel>>({
      nzTitle: `${formType} User Form`,
      nzContent: UserFormComponent,
      nzWidth: 720,
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
      if (response && response.status && response.data) {
        this.dataList.push(response.data);
      }
    });
  }

  download(exportType: string) {
    this.commonService.showLoading();
    this.userService.export(this.pageQuery, exportType).subscribe(result => {
      this.commonService.hideLoading();
      const extension = (exportType == 'csv') ? 'csv' : (exportType == 'excel') ? 'xlsx' : 'json';
      const mimeType = (extension == 'csv') ? 'text/csv' : (extension == 'xlsx') ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'application/json';
      const fileName = "Users-" + new Date().getTime() + `.${extension}`;
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


  delete(item: UserModel) {
    this.commonService.showLoading('Delete in progress..');
    this.userService.delete(item.id).subscribe(
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
      this.commonService.showMessage('No action was taken');
    }, 1000);
  }

}
