import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { AuthUserData, CommonService, CountryModel, CountryService, DataResponseModel, StateService } from 'src/app/shared';
import { StateModel } from 'src/app/shared/models/state-model';
import { StateFormComponent } from './state-form/state-form.component';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {
  dataList: StateModel[] = [];
  tempData: StateModel[] = [];
  countryList: CountryModel[] = [];
  searchKeyword: string;
  loading = false;
  onlyActive: boolean = true;
  countryId: number;

  constructor(
    private commonService: CommonService,
    private loanTypeService: StateService,
    private countryService: CountryService,
    private authData: AuthUserData,
    private drawerService: NzDrawerService
  ) { }

  ngOnInit(): void {
    this.getData();
    this.getCountires();
  }

  getData() {
    this.loading = true;
    this.loanTypeService.getAll(this.onlyActive).subscribe(
      result => {
        this.dataList = result || [];
        this.tempData = result || [];
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
        id: data?.id,
        countryId: this.countryId,
        countryList: this.countryList
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
    if (this.countryId && this.countryId > 0) {
      this.dataList = this.tempData.filter((item) => item.countryId == this.countryId);
    }
  }

  clear() {
    this.dataList = this.tempData;
    this.searchKeyword = null;
  }
}
