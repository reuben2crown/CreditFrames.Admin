import { RequestStatusEnum } from './enums';
import { BaseModel } from './base-model';
import { LenderModel } from './lender-model';
import { LoanTypeModel } from './loan-type-model';
import { UserFormModel } from './user-model';

export class LoanModel extends BaseModel {
  public userId: number;
  public user: UserFormModel;
  public loanTypeId: number;
  public loanType: LoanTypeModel;//
  public lenderId: number; 
  public lender: LenderModel;
  public loanAmount: number;//
  public loanPurpose: string;
  public loanTenor: number;
  public interestRate: number;
  public moratoriumPeriod: number;
  public paybackOption: string;
  public bankName: string;//
  public accountNumber: string;
  public accountName: string;//
  public taxID: string;
  public bvn: string;
  public bvnIsValid: boolean;
  public bvnValidationError: string;
  public currencyCode: string;n
  public referenceNumber: string;
  public isEligible: boolean;
  public retryCount: number;
  public requestDate: Date;
  public requestChannel: string;
  public submittedBy: string;
  public brokerCode: string;
  public loanStatus: string;//
  public loanProcessor: string;
  public overdueBalance: number;
}

export class LoanRequestModel {  
  public loanProductId: string;
  public accountNumber: string;
  public loanAmount: number;
  public paybackOptionId: string;
  public loanPurpose: string;
  public secondaryEmail?: string;
  public businessDetails: string;
  public businessSectorCode: string;
  public currentAddress?: string;
  public existingLoanWithOtherBank: boolean;
  public requestChannel: string;
  public requestBranchID?: string;
  public submittedBy: string;
  public brokerCode?: string;
  public customData: LoanCustomData[];
}

export class LoanResponseModel {
  public loanApplicationId: string;
  public accountNumber: string;
  public accountName: string;
  public customerId: string;
  public loanAmount: number;
  public requestDate: string | Date;
  public referenceNumber: string;
  public paybackOptionTitle: string;
  public loanStatus: RequestStatusEnum;
  public isPending: boolean;
  public isEligible: boolean;
  public isQualified: boolean;
  
  public loanTenor: number;
  public interestRate: number;
  public loanPurpose: string;
  public submittedBy: string;
  public brokerCode: string;
  public accountOfficerEmail: string;
}

export class LoanCustomData {
  public fieldName: string;
  public value: string;
}
