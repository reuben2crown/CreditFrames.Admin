import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { RequestQueryParams, CommonService, AuthUserData, DataResponseModel } from 'src/app/shared';
import { StateFormModel, StateModel } from 'src/app/shared/models/state-model';
import { StateService } from 'src/app/shared/services/state.service';
import { StateFormComponent } from './state-form/state-form.component';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {
  dataList: StateModel[] = [];
  pageQuery: RequestQueryParams = new RequestQueryParams();
  checked = false;
  loading = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  // onlyActive: boolean;

  constructor(
    private commonService: CommonService,
    private stateService: StateService,
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
    this.stateService.getAll(/*this.onlyActive*/).subscribe(
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

  
  openForm(data?: StateModel) {
    var formType = (data) ? 'Edit' : 'Create';
    const drawerRef = this.drawerService.create<StateFormComponent, { result: DataResponseModel<StateModel> }, DataResponseModel<StateModel>>({
      nzTitle: `${formType} State Form`,
      nzContent: StateFormComponent,
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


  delete(item: StateModel) {
    this.commonService.showLoading();
    this.stateService.delete(item.id).subscribe(result => {
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
