export class LoanFeatureModel {
    public id: number;
    public name: string;
    public isActive: boolean;
    public createdBy: string;
    public updatedBy: string;
    public createdDate: string;
}

export class LoanFeatureItemModel {
    public id: number;
    public featureId: number;
    public featureName: string;
    public isSelected: boolean;
}
