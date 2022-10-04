import { BaseModel } from "./base-model";
import { CountryModel } from "./country-model";
import { LoanTypeItemModel } from "./loan-type-model";
import { UserModel } from "./user-model";

export class SearchHistoryModel extends BaseModel {
    userId: number;
    user: UserModel;
    loanAmount: number;
    loanTypeId: number;
    loanType: LoanTypeItemModel;
    countryId: number;
    country: CountryModel;
    trialCount: number;
    lastTrialDate: Date;
    deviceId: string;
}