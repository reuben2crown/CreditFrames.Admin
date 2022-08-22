import { BaseModel } from "./base-model";

export class LenderModel extends BaseModel {
    lenderName: string;
    description: string;
    emailAddress: string;
    phoneNumber: string;
    logo: string;
    website: string;
    countryId: number;
    stateId: number;
    address: string;
    city: string;
    hasWebApp: boolean;
    hasMobileApp: boolean;
    minimumLoanAmount: number;
    maximumLoanAmount: number;
    turnAroundTimeInMinute: number;
    eligiblityCriteria: string;
    facebookUrl: string;
    twitterUrl: string;
    linkedinUrl: string;
    loanTypes: LenderLoanType[] = [];
    features: LenderFeatureModel[] = [];
}

export class LenderLoanType {
    id: number;
    createdDate: Date;
    lenderId: number;
    loanTypeId: number;
    loanTypeName: string;
    minimumLoanAmount: number;
    maximumLoanAmount: number;
    returnCustomerAmount: number;
    minimumInterestRate: number;
    maximumInterestRate: number;
    repaymentTimeFrame: number;
    requirements: string;
    security: string;
    createdBy: string;
    updatedBy: string;
}

export class LenderFeatureModel {
    id: number;
    featureId: number;
    featureName: string;
    isSelected: boolean;
}
