import { Component, Input, OnInit } from '@angular/core';
import { CommonService, LoanModel, LoanService } from 'src/app/shared';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.scss']
})
export class LoanDetailComponent implements OnInit {
  @Input() data: LoanModel;

  constructor(
    private commonService: CommonService,
    private loanService: LoanService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.commonService.showLoading();
    this.loanService.getById(this.data.id).subscribe(response => {
      this.data = response;
      this.commonService.hideLoading();
    }, error => {
      this.commonService.handleError(error);
    });
  }

}
