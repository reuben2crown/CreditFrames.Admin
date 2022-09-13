export class CountryModel  {
    public name: string;
    public code: string;
    public currencyCode: number;
    public flagUrl: URL;
    public unicode: string;
    public isActive: boolean;
    public states: [];
    public id: number;
    public createdDate: Date;
}

export class CountryFormModel  {
    public name: string;
    public code: string;
    public currencyCode: number;
    public flagUrl: URL;
    public unicode: string;
    public isActive: boolean;
    public states: [];
    public id: number;
    public createdDate: Date;
    public createdBy: string;
    public editedBy: string;
}