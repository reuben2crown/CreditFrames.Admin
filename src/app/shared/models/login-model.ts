import { ChannelEnum } from './enums';

export class LoginModel {
  public username: string;
  public password: string;
  public channel: ChannelEnum;
  public ipAddress: string;
}

export class ForgotPasswordModel {
  public email: string;
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
  public token: string;
  public refreshToken: string;
}

export class LoginResponseModel {
  public status: boolean;
  public message: string;
  public accessToken: string;
  public refreshToken: string;
}

