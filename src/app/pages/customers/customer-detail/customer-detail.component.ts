import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonService, ConsultationModel, ConsultationService, PagedList, PaymentModel, PaymentService, RequestQueryParams, UserModel } from 'src/app/shared';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
  providers: [DatePipe]
})
export class CustomerDetailComponent implements OnInit {
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;

  @Input() data: UserModel;
  paymentList: PaymentModel[] = [];
  consultationList: ConsultationModel[] = [];
  loading: boolean;
  pageQuery: RequestQueryParams = new RequestQueryParams();
  pagination: PagedList<any> = new PagedList<any>();
  tabIndex: number;
  
  constructor(private drawerRef: NzDrawerRef<any>, private commonService: CommonService,
    private consultationService: ConsultationService, private paymentService: PaymentService) {}

  close(): void {
    this.drawerRef.close();
  }

  ngOnInit(): void {

  }

  getConsultations() {
    this.loading = true;
    this.consultationService.getByUser(this.data.phoneNumber, this.pageQuery).subscribe(
      result => {
        this.pagination = result;
        this.consultationList = result.items || [];
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.commonService.handleError(error);
      }
    );
  }

  getPayments() {
    this.loading = true;
    this.paymentService.getByUser(this.data.phoneNumber, this.pageQuery).subscribe(
      result => {
        this.pagination = result;
        this.paymentList = result.items || [];
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.commonService.handleError(error);
      }
    );
  }

  tabChanged(index) {
    this.paymentList = [];
    this.consultationList = [];
    this.loading = true;
    this.pageQuery = new RequestQueryParams();
    this.pagination = new PagedList<any>();
    this.tabIndex = index;
    if (index == 1) {
      this.getPayments();
    }
    if (index == 2) {
      this.getConsultations();
    }
  }
  
  pageChanged(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    this.pageQuery.pageNumber = pageIndex; // || this.pageQuery.pageNumber;
    this.pageQuery.pageSize = pageSize; // || this.pageQuery.pageSize;
    if (!this.pageQuery.pageNumber) {
      // this.pageQuery.pageNumber = 1;
      if (this.tabIndex == 1) {
        this.getPayments();
      }
      if (this.tabIndex == 2) {
        this.getConsultations();
      }
    }
  }

}
