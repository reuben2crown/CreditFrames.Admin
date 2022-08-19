import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { PaymentModel } from 'src/app/shared';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss'],
  providers: [DatePipe]
})
export class PaymentDetailComponent implements OnInit {
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: PaymentModel };
    drawerRef: NzDrawerRef<PaymentModel>;
  }>;

  @Input() data: PaymentModel;
  
  constructor(private drawerRef: NzDrawerRef<any>) {}

  close(): void {
    this.drawerRef.close();
  }

  ngOnInit(): void {
  }

  print() {
    window.print();
  }
}
