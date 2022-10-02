import { BaseModel } from "./base-model";
import { CountryModel } from "./country-model";
import { StateModel } from "./state-model";

export class LenderModel extends BaseModel {
    public lenderName: string;
    public description: string;
    public emailAddress: string;
    public phoneNumber: string;
    public logo: string;
    public website: string;
    public loanApplicationUrl: string;
    public countryId: number;
    public country: CountryModel;
    public stateId?: number;
    public state: StateModel;
    public hasWebApp: boolean;
    public hasMobileApp: boolean;
    public averageRating: number;
    public facebookUrl: string;
    public twitterUrl: string;
    public instagramUrl: string;
    public linkedinUrl: string;
    public isActive: boolean;
    public apiActivated: boolean;

    public minimumLoanAmount: number;
    public maximumLoanAmount: number;
    public turnAroundTimeInMinute: number;

    public loanTypes: LenderLoanType[] = [];
    public features: LenderFeatureItemModel[] | string[] = [];
    public ratings: RatingModel[];
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
    public lender: LenderModel;
    public minimumLoanAmount: number;
    public maximumLoanAmount: number;
    public returnCustomerAmount: number;
    public minimumInterestRate: number;
    public maximumInterestRate: number;
    public minimumLoanTenor: number;
    public maximumLoanTenor: number;
    public moratoriumPeriod: number;
    public minTurnAroundTimeInMinute: number;
    public maxTurnAroundTimeInMinute: number;
    public requirements: string;
    public eligiblityCriteria: string;
    public security: string;
    public score: number;
    public rank: number;
}

export class RatingModel {

}
