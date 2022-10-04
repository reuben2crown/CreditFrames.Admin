import { BaseModel } from "./base-model";
import { PermissionModel } from "./permission-model";

export class RoleModel extends BaseModel {
    public name: string;
    public permissions?: RolePermissionModel[];
}

export class RoleFormModel {
    public id: number;
    public name: string;
    public createdBy?: string;
    public updatedBy?: string;
    public permissions?: RolePermissionModel[];
}

export class RoleListModel {
    public id: number;
    public name: string;
}

export class RolePermissionModel extends BaseModel {
    public roleId: number;
    public permissionId: number;
    public permissionName: string;
    public isSelected: boolean;
    public permission: PermissionModel;
}
