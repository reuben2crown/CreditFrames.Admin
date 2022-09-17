import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { RequestQueryParams, CommonService, AuthUserData, DataResponseModel } from 'src/app/shared';
import { LoanTypeModel } from 'src/app/shared/models/loan-type-model';
import { LoanTypeService } from 'src/app/shared/services/loan-type.service';
import { LoanTypeFormComponent } from './loan-type-form/loan-type-form.component';

@Component({
  selector: 'app-loan-types',
  templateUrl: './loan-types.component.html',
  styleUrls: ['./loan-types.component.scss']
})
export class LoanTypesComponent implements OnInit {
  dataList: LoanTypeModel[] = [];
  pageQuery: RequestQueryParams = new RequestQueryParams();
  loading = false;
  onlyActive: boolean;

  constructor(
    private commonService: CommonService,
    private loanTypeService: LoanTypeService,
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
    this.loanTypeService.getAll(this.onlyActive).subscribe(result => {
        this.dataList = result || [];
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.commonService.handleError(error);
      }
    );
  }

  openForm(data?: LoanTypeModel) {
    var formType = (data) ? 'Edit' : 'Create';
    const drawerRef = this.drawerService.create<LoanTypeFormComponent, { result: DataResponseModel<LoanTypeModel> }, DataResponseModel<LoanTypeModel>>({
      nzTitle: `${formType} Loan Type Form`,
      nzContent: LoanTypeFormComponent,
      nzWidth: 500,
      nzClosable: true,
      nzCloseOnNavigation: true,
      nzContentParams: {
        data: data,
        id: data?.id
      }
    });

    drawerRef.afterClose.subscribe(result => {
      if (result && result.status && result.data) {
        var index = this.dataList.findIndex(x => x.id == result.data.id);
        
        if (index > -1) {
          this.dataList.splice(index, 1, result.data);
        } else {
          this.dataList.push(result.data);
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

  delete(item: LoanTypeModel) {
    this.commonService.showLoading();
    this.loanTypeService.delete(item.id).subscribe(result => {
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

  deleteMany(action: 'delete' | 'disable' | 'enable') {

  }
}
