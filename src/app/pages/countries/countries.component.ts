import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { RequestQueryParams, CommonService, AuthUserData, DataResponseModel } from 'src/app/shared';
import { CountryModel } from 'src/app/shared/models/country-model';
import { CountryService } from 'src/app/shared/services/country.service';
import { CountryFormComponent } from './country-form/country-form.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  dataList: CountryModel[] = [];
  pageQuery: RequestQueryParams = new RequestQueryParams();
  checked = false;
  loading = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  fetchAll: boolean = true;

  constructor(
    private commonService: CommonService,
    private countryService: CountryService,
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
    this.countryService.getAll(this.fetchAll).subscribe(
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

  openForm(data?: CountryModel) {
    var formType = (data) ? 'Edit' : 'Create';
    const drawerRef = this.drawerService.create<CountryFormComponent, { result: DataResponseModel<CountryModel> }, DataResponseModel<CountryModel>>({
      nzTitle: `${formType} Country Form`,
      nzContent: CountryFormComponent,
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


  delete(item: CountryModel) {
    this.commonService.showLoading();
    this.countryService.delete(item.id).subscribe(result => {
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
