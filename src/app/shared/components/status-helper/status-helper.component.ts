import { Component, Input, OnInit } from '@angular/core';
import { RequestStatusEnum } from '../../models/enums';

@Component({
  selector: 'status-helper',
  templateUrl: './status-helper.component.html',
  styleUrls: ['./status-helper.component.scss']
})
export class StatusHelperComponent implements OnInit {
  @Input() loanStatus: RequestStatusEnum | string;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.loanStatus);
  }

  getColor(): string {
    var color = 'warning';
    if (this.loanStatus == RequestStatusEnum.approved) {
      color = 'success';
    }
    if (this.loanStatus == RequestStatusEnum.cancelled) {
      color = 'danger';
    }
    if (this.loanStatus == RequestStatusEnum.pending) {
      color = 'warning';
    }
    if (this.loanStatus == RequestStatusEnum.disbursed) {
      color = 'purple';
    }
    if (this.loanStatus == RequestStatusEnum.awaitingApproval) {
      color = 'info';
    }
    if (this.loanStatus == RequestStatusEnum.completeRepayment) {
      color = 'inverse';
    }
    return color;
  }

}
