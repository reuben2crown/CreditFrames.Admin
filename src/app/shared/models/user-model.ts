import { BaseModel } from './base-model';
import { AccountTypeEnum, ChannelEnum } from './enums';

export class UserModel extends BaseModel {
  public phoneNumber: string;
  public emailAddress: string;
  public lastName: string;
  public firstName: string;
  public gender: string;
  public dateOfBirth: string | Date;
  public age: number;
  public consultationBalance: number
  public lastLoginDate: string;
  public accountType: AccountTypeEnum;
  public signupChannel: string;
  public emailVerified: boolean;
  public phoneVerified: boolean;
  public isActive: boolean;
  public createdBy?: number | string | null;
  public updatedBy?: number | string | null;
  public currentPaymentPlan: string;
  public planExpiryDate: string;
  public lastLogin: Date;
  public enable2FA: boolean;
  public isBlocked: boolean;
  public isLockedOut: boolean;
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
