import { BaseModel } from "./base-model";
import { CountryModel } from "./country-model";

export class StateModel extends BaseModel{
    public countryId: number;
    public country: CountryModel;
    public name: string;
    public code: string;
    public isActive: boolean;
}