import { BaseModel } from "./base-model";

export class PermissionModel extends BaseModel {
    public name: string;
    public module: string; // E.g: Category or Section
    public description: string;
}

export class PermissionItemModel
{
    public permissionId: number;
    public permissionName: string;
    public isSelected: boolean;
}

export class PermissionFormModel {
    public id: number;
    public name: string;
    public module: string; // E.g: Category or Section
    public description: string;
    public createdBy?: string;
    public updatedBy?: string;
}
