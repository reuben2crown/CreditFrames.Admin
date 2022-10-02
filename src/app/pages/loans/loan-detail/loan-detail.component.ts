import { Component, Input, OnInit } from '@angular/core';
import { LoanModel } from 'src/app/shared';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.scss']
})
export class LoanDetailComponent implements OnInit {
  @Input() data: LoanModel;

  constructor() { }

  ngOnInit(): void {
  }

}
