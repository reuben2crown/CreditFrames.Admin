import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { SettingModel, CommonService, AuthUserData, DataResponseModel, SettingService, SettingFormModel } from 'src/app/shared';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  dataList: SettingModel[] = [];
  tempData: SettingModel[] = [];
  searchKeyword: string;
  loading = false;
  editCache: { [key: string]: { edit: boolean; data: SettingModel } } = {};

  constructor(
    private commonService: CommonService,
    private settingService: SettingService,
    private authData: AuthUserData
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  search() {
    this.dataList = this.tempData.filter((item) => item.key.toLowerCase().indexOf(this.searchKeyword?.toLowerCase()) !== -1);
  }

  clear() {
    this.dataList = this.tempData;
    this.searchKeyword = null;
  }

  getData() {
    this.loading = true;
    this.settingService.getAll().subscribe(
      result => {
        this.dataList = result || [];
        this.tempData = result || [];
        this.updateEditCache();
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.commonService.handleError(error);
      }
    );
  }

  toggle($event, id: number) {
    this.editCache[id].data.value = $event;
  }

  togglevalue(id: number) {
    return this.editCache[id].data.value?.toString() == "true";
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.dataList.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.dataList[index] },
      edit: false
    };
  }

  saveEdit(id: number): void {
    let formData = this.editCache[id].data;
    var model = this.dataList.find(x => x.id == id);
    if (!formData || !model) {
      this.commonService.showMessage('Edit item is not found', 'error');
      return;
    }

    // all value must be string
    formData.value = formData.value?.toString();
    if (formData.value == "") {
      this.commonService.showMessage('You cannot submit empty value', 'error');
      return;
    }

    let user = this.authData.getUserData();
    if (!user) {
      this.commonService.showToastError('Please login to continue');
      this.authData.logout();
      return;
    }

    if (model.value != formData.value) {
      this.loading = true;
      this.commonService.showLoading();
      formData.editorName = `${user.firstName} ${user.lastName}`;

      this.settingService.update(model.id, (formData as SettingFormModel)).subscribe(response => {
        this.loading = false;
        this.commonService.hideLoading();
        if (response.status) {
          this.commonService.showToastSuccess(response.message);

          model.value = formData.value;
          model.updatedDate = new Date();
          model.editorName = formData.editorName;
          const index = this.dataList.findIndex(item => item.id === id);
          Object.assign(this.dataList[index], model);
          this.editCache[id].edit = false;
        }
        else {
          this.commonService.showToastError(response.message);
        }
      }, error => {
        this.loading = false;
        this.commonService.handleError(error);
      });
    } else {
      this.commonService.showMessage('The current value has not changed', 'warning');
      return;
    }
  }

  updateEditCache(): void {
    this.dataList.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
    // console.log(this.editCache);    
  }

}
