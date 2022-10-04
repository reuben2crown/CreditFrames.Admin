import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { RoleModel, CommonService, RoleService, EventHelper, QueryParams, DataResponseModel } from 'src/app/shared';
import { RoleFormComponent } from './role-form/role-form.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  dataList: RoleModel[] = [];
  pageQuery: QueryParams = new QueryParams();
  loading = false;

  constructor(private drawerService: NzDrawerService, private commonService: CommonService, private roleService: RoleService, private events: EventHelper) { }

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
    this.roleService.getAll().subscribe(result => {
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

  openForm(data?: RoleModel) {
    var formType = (data) ? 'Edit' : 'Create';
    const drawerRef = this.drawerService.create<RoleFormComponent, { result: DataResponseModel<RoleModel> }, DataResponseModel<RoleModel>>({
      nzTitle: `${formType} Role Form`,
      nzContent: RoleFormComponent,
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

  delete(item: RoleModel) {
    this.commonService.showLoading();
    this.roleService.delete(item.id).subscribe(result => {
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
