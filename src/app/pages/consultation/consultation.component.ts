import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonService, AuthUserData, ConsultationService, ConsultationModel, PagedList, RequestQueryParams, BonusTypeEnum, AddBonusConsultationModel } from 'src/app/shared';
import { ConsultationDetailComponent } from './consultation-detail/consultation-detail.component';
import { format, startOfMonth, startOfYesterday, endOfYesterday, startOfToday, endOfToday } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TopupComponent } from './topup/topup.component';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {
  dataList: ConsultationModel[] = [];
  pageQuery: RequestQueryParams = new RequestQueryParams();
  pagination: PagedList<ConsultationModel> = new PagedList<ConsultationModel>();
  checked = false;
  loading = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  BonusTypeEnum: typeof BonusTypeEnum =  BonusTypeEnum;
  bonusType: BonusTypeEnum;
  bonusLimit: number;
  bonusTypeKeys: string[] = [];

  dateRange = { Yesterday: [startOfYesterday(), endOfYesterday()], Today: [startOfToday(), endOfToday()], 'This Month': [startOfMonth(new Date()), new Date()] };

  constructor(
    private commonService: CommonService,
    private consultationService: ConsultationService,
    private authData: AuthUserData,
    private drawerService: NzDrawerService,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
    // this.pageQuery.pageNumber = 1;
    // this.getData();
    this.bonusTypeKeys = Object.keys(this.BonusTypeEnum); //.filter(f => !isNaN(Number(f)));
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
    this.pagination = new PagedList<ConsultationModel>();
  }

  getData() {
    // if (this.dataList.length && this.pagination.hasNext) {
    //   this.pageQuery.pageNumber = this.pageQuery.pageNumber + 1;
    // }
    this.loading = true;
    this.consultationService.getPaged(this.pageQuery).subscribe(
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

  openTopup() {
    this.modalService.create({
      nzTitle: 'Topup Consultation',
      nzContent: TopupComponent
    });
  }

  showDetails(data: ConsultationModel) {
    if (data) {
      const drawerRef = this.drawerService.create<ConsultationDetailComponent, { value: string }, string>({
        nzTitle: 'Consultation Details',
        nzContent: ConsultationDetailComponent,
        nzWidth: 640,
        nzClosable: true,
        nzCloseOnNavigation: true,
        nzContentParams: {
          data: data          
        }
      });
  
      drawerRef.afterOpen.subscribe(() => {
        // console.log('Drawer(Component) open');
      });
  
      drawerRef.afterClose.subscribe(data => {
        // console.log(data);
        // if (typeof data === 'string') {
        //   this.value = data;
        // }
      });
    }
  }

  download(exportType: string, reportType: 'all' | 'balance' | 'summary' = 'all') {
    this.commonService.showLoading();
    this.consultationService.export(this.pageQuery, exportType, reportType).subscribe(result => {
      this.commonService.hideLoading();
      const extension = (exportType == 'csv') ? 'csv' : (exportType == 'excel') ? 'xlsx' : 'json';
      const mimeType = (extension == 'csv') ? 'text/csv' : (extension == 'xlsx') ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'application/json';
      const fileName = "Consultations-" + new Date().getTime() + `.${extension}`;
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
    }, 1000);
  }
  
  reset() {
    this.bonusType = null;
    this.bonusLimit = null;
  }

  addBonus() {
    let user = this.authData.getUserData();
    if (!user) {
      this.commonService.showToastError('Please login to continue');
      this.authData.logout();
      return;
    }

    if (this.bonusType) {
      this.loading = true;
      this.commonService.showLoading();
      let formData = new AddBonusConsultationModel();
      formData.adminUserId = user.userId;
      formData.bonusType = this.bonusType;
      formData.limit = this.bonusLimit;

      this.consultationService.addBonus(formData).subscribe(response => {
        this.loading = false;
        this.commonService.hideLoading();
        if (response.status) {
          this.commonService.showToastSuccess(response.message);
        }
        else {
          this.commonService.showToastError(response.message);
        }
      }, error => {
        this.loading = false;
        this.commonService.handleError(error);
      });
    } else {
      this.commonService.showMessage("Bonus type was not seleted", "warning");
    }
  }
}
