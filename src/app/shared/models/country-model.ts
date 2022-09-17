import { BaseModel } from "./base-model";
import { StateModel } from "./state-model";

export class CountryModel extends BaseModel{
    public name: string;
    public code: string;
    public currencyCode: string;
    public flagUrl: string;
    public unicode: string;
    public isActive: boolean;
    public states: StateModel[] = [];
}