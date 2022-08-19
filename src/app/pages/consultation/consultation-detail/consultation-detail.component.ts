import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { ConsultationModel } from 'src/app/shared';

@Component({
  selector: 'app-consultation-detail',
  templateUrl: './consultation-detail.component.html',
  styleUrls: ['./consultation-detail.component.scss'],
  providers: [DatePipe]
})
export class ConsultationDetailComponent implements OnInit {
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;

  @Input() data: ConsultationModel;
  
  constructor(private drawerRef: NzDrawerRef<any>) {}

  close(): void {
    this.drawerRef.close();
  }

  ngOnInit(): void {
  }

}
