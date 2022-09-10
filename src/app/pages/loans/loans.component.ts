import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
// import { CommonService, AuthUserData, ConsultationService, ConsultationModel, PagedList, RequestQueryParams, BonusTypeEnum, AddBonusConsultationModel } from 'src/app/shared';
import { LoanModel } from 'src/app/shared/models/loan-model';
import { LoanService } from 'src/app/shared/services/loan.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  LoanData : LoanModel[];
  constructor(private loanService: LoanService, private modalService: NzModalService) { }

  ngOnInit(): void {

    // this.loanService.getLoan().subscribe((data) => {
    //   this.LoanData = data;
    // });
  }

}
