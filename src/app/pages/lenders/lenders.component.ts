import { Component, OnInit } from '@angular/core';
import { LenderModel } from 'src/app/shared/models/lender-model';

@Component({
  selector: 'app-lenders',
  templateUrl: './lenders.component.html',
  styleUrls: ['./lenders.component.scss']
})
export class LendersComponent implements OnInit {
  dataList: LenderModel[] = [];

  constructor() { }

  ngOnInit(): void {
    this.dataList.push(new LenderModel());
    this.dataList.push(new LenderModel());
  }

}
