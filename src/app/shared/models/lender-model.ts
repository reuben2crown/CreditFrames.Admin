import { BaseModel } from "./base-model";

export class LenderModel extends BaseModel {
    public lenderName: string;
    public description: string;
    public emailAddress: string;
    public phoneNumber: string;
    public logo: string;
    public website: string;
    public loanApplicationUrl: string;
    public countryId: number;
    public stateId?: number;
    public hasWebApp: boolean;
    public hasMobileApp: boolean;
    public averageRating: number;
    public facebookUrl: string;
    public twitterUrl: string;
    public instagramUrl: string;
    public linkedinUrl: string;
    public loanTypes: LenderLoanType[] = [];
    public features: LenderFeatureItemModel[] = [];
   
    public rank: number;
    public score: number;
    public isActive: boolean;
    public apiActivated: boolean;
}

export class LenderFeatureItemModel {
    public id: number;
    public featureId: number;
    public featureName: string;
    public isSelected: boolean;
}

export class LenderLoanType extends BaseModel {
    public lenderId: number;
    public loanTypeId: number;
    public loanTypeName: string;
    public minimumLoanAmount: number;
    public maximumLoanAmount: number;
    public returnCustomerAmount: number;
    public averageLoanTenor: number;
    public averageInterestRate: number;
    public repaymentTimeFrame: string;
    public moratoriumPeriod: number;
    public turnAroundTimeInMinute: number;
    public requirements: string;
    public security: string;
    public score: number;
}
