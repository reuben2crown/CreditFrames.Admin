import { BaseModel } from "./base-model";

export class LoanTypeModel extends BaseModel {
    public name: string;
    public isActive: boolean;
}

export class LoanTypeItemModel {
    public id: number;
    public name: string;
}
