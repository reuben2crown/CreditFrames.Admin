import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { CountryModel, CommonService, CountryService, AuthUserData, DataResponseModel } from 'src/app/shared';
import { CountryFormComponent } from './country-form/country-form.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  dataList: CountryModel[] = [];
  tempData: CountryModel[] = [];
  searchKeyword: string;
  loading = false;
  fetchAll: boolean = true;

  constructor(
    private commonService: CommonService,
    private loanTypeService: CountryService,
    private authData: AuthUserData,
    private drawerService: NzDrawerService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.loanTypeService.getAll(this.fetchAll).subscribe(
      result => {
        this.dataList = result || [];
        this.dataList = this.dataList.sort((a, b) => Number(b.isActive) - Number(a.isActive));
        this.tempData = this.dataList.sort((a, b) => Number(b.isActive) - Number(a.isActive));
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

  search() {
    if (this.searchKeyword) {
      this.dataList = this.tempData.filter((item) => item.name.toLowerCase().indexOf(this.searchKeyword?.toLowerCase()) !== -1);
    }
  }

  clear() {
    this.dataList = this.tempData;
    this.searchKeyword = null;
  }
}
