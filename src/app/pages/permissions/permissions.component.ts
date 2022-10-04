import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { CommonService, DataResponseModel, EventHelper, PermissionModel, PermissionService, QueryParams } from 'src/app/shared';
import { PermissionFormComponent } from './permission-form/permission-form.component';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  dataList: PermissionModel[] = [];
  pageQuery: QueryParams = new QueryParams();
  loading = false;
  
  constructor(private drawerService: NzDrawerService, private commonService: CommonService, private permissionService: PermissionService, private events: EventHelper) { }

  ngOnInit(): void {
    this.pageQuery.pageNumber = 1;
    this.pageQuery.pageSize = 20;
    this.events.userEvent.subscribe((value: any) => {
      if (value) {
        this.getData();
      }
    });
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.permissionService.getAll().subscribe(result => {
      this.dataList = result || [];
      this.loading = false;
    },
      error => {
        this.loading = false;
        this.commonService.handleError(error);
      }
    );
  }

  search() {
    this.pageQuery.pageNumber = 1;
    this.getData();
  }

  openForm(data?: PermissionModel) {
    var formType = (data) ? 'Edit' : 'Create';
    const drawerRef = this.drawerService.create<PermissionFormComponent, { result: DataResponseModel<PermissionModel> }, DataResponseModel<PermissionModel>>({
      nzTitle: `${formType} Permission Form`,
      nzContent: PermissionFormComponent,
      nzWidth: 500,
      nzClosable: true,
      nzCloseOnNavigation: true,
      nzContentParams: {
        formData: data,
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
        this.dataList.sort((a, b) => a.name.localeCompare(b.name));
      }
    });
  }

  delete(item: PermissionModel) {
    this.commonService.showLoading();
    this.permissionService.delete(item.id).subscribe(result => {
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
}

