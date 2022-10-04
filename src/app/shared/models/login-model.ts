import { ChannelEnum } from './enums';

export class LoginModel {
  public emailAddress: string;
  public password: string;
  public loginChannel: ChannelEnum;
  public ipAddress: string;
  public deviceId?: string;
}

export class Validate2FATokenModel {
  public username: string;
  public tokenCode: string; // Generated Token Code
  public deviceId?:string;
  public loginChannel: any;
  public accessToken: string;
}

export class ForgotPasswordModel {
  public emailAddress: string;
  public channel: string;
}

export class ChangePasswordModel {
  public userId: number;
  public oldPassword?: string;
  public newPassword: string;
  public confirmPassword: string;
}

export class PasswordResetModel {
  public userId: number;
  public resetCode: string;
  public newPassword: string;
}

export class AccountVerificationModel {
  public userId: number;
  public token: string;
  public verificationType: string;
}

export class ResendVerificationModel {
  public recipient: string;
  public verificationType = 'Email';
}

export class ReissueTokenModel {
  // public token: string;
  public refreshToken: string;
  public deviceId?: string;
}

export class LoginResponseModel {
  public accessToken: string;
  public refreshToken: string;
  public require2FA: string; // User must use 2FA
  public expiresIn: number;
  public isNewDevice: boolean;
}

