import { BaseModel } from './base-model';
import { AccountTypeEnum, ChannelEnum } from './enums';
import { PermissionItemModel, PermissionModel } from './permission-model';
import { RoleListModel } from './role-model';

export class UserModel extends BaseModel {
public firstName: string;
public lastName: string;
public emailAddress: string;
public phoneNumber: string;
public gender: string;
public bvn: string;
public dateOfBirth: Date;
public age: number;
public lastLogin: Date;
public enable2FA: boolean;
public isOnline: boolean;
public isActive: boolean;
public accountType: string;
public isBlocked: boolean;
public blockedReason: string;
public emailIsVerififed: boolean;
public phoneNumberVerified: boolean;
public isLockedOut: boolean;
public lockedOutDate: Date;
public lastLoginDate: Date;
public signupChannel: ChannelEnum;
public roleId: number;
public role: RoleListModel;
public permissions: UserPermissionModel[];
}

export class UserFormModel {
public id: number;
public roleId: number;
public firstName: string;
public lastName: string;
public emailAddress: string;
public phoneNumber: string;
public password?: string;
public signupChannel: ChannelEnum;
public ipAddress: string;

public enable2FA: boolean; // User must use 2FA
public isActive: boolean;
public isBlocked?: boolean;
public blockedReason?: string;
public createdBy?: string;
public updatedBy?: string;
public permissions: PermissionItemModel[] = [];
}

export class AdminFormModel extends UserFormModel {
public // public password: string;
}

export class AuthTokenModel {
public userId: number;
public roleId: number;
public firstName: string;
public lastName: string;
public roleName: string;
public emailAddress: string;
public phoneNumber: string;
public accountType: AccountTypeEnum;
public lastLoginDate: Date;
}

export class UserPermissionModel extends BaseModel {
  public userId: number;
  public permissionId: number;
  public permissionName: string;
  public permissionModule: string;
  public isSelected: boolean;
  public permission: PermissionModel;
}

export class LoginHistoryModel extends BaseModel {
  public userId: number;
  public user: UserModel;
  public ipAddress: string;
  public channel: string;
  public loginTime: Date;
  public refreshToken: string;
  public refreshTokenExpiryTime: Date;
  public deviceId: string;
  public deviceType: string;
  public operatingSystem: string;
  public loginLocation: string;
  public userAgent: string;
  public isActive: boolean;
}