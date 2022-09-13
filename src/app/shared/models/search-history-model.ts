import { BaseModel } from "./base-model";
import { CountryFormModel } from "./country-model";
import { LenderModel } from "./lender-model";
import { LoanTypeModel } from "./loan-type-model";
import { StateFormModel } from "./state-model";
import { UserFormModel } from "./user-model";

export class SearchHistoryModel extends BaseModel {
    public userId: number;
    public user: UserFormModel; // item.user?.email || 'Anonymous'
    public loanTypeId: number;
    public loanType: LoanTypeModel; // item.loanType?.name
    public countryId: number;
    public country: CountryFormModel; //

    public loanAmount: number; // 
    public trialCount: number; 
    public lastTrialDate: Date; 
    public deviceId: string;
    public deviceInfo: string;

}
