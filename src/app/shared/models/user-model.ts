import { BaseModel } from './base-model';
import { AccountTypeEnum, ChannelEnum } from './enums';

export class UserModel extends BaseModel {
  public lastName: string;
  public firstName: string;
  public phoneNumber: string;
  public emailAddress: string;
  public gender: string;
  public dateOfBirth: string | Date;
  public age: number;
  public accountType: AccountTypeEnum;
  public signupChannel: string;
  public emailIsVerififed: boolean;
  public phoneNumberVerified: boolean;
  public lastLoginDate: string;
  public isOnline: boolean;
  public isActive: boolean;
  public currentPaymentPlan: string;
  public planExpiryDate: string;
  public lastLogin: Date;
  public enable2FA: boolean;
  public isBlocked: boolean;
  public blockedReason: string;
  public isLockedOut: boolean;
  public lockedOutDate: Date;
  public role: RoleModel;
}

export class RoleModel extends BaseModel {
  public name: string;
}

export class BlockUserModel {
  authorizedUserId: string;
  status: boolean;
  reason: string;
}

export class UserFormModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public emailAddress: string;
  public phoneNumber: string;
  public password?: string;
  public channel: ChannelEnum;
  public ipAddress: string;
  public createdBy?: number | string | null;
}

export class AdminFormModel extends UserFormModel {
  // public password: string;
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
