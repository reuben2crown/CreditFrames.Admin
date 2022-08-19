export enum RequestStatusEnum {
  pending,
  pendingCreditCheck,
  awaitingDocumentation,
  pendingVerification,
  awaitingApproval,
  approved,
  disbursed,
  completeRepayment,
  cancelled,
  rejected
}

export enum AccountTypeEnum {
  customer = 'Customer',
  admin = 'Admin'
}

export enum ProfileStatusEnum {
  Active = 1,
  Blocked,
  Disabled
}

export enum ChannelEnum {
  Mobile = 'Mobile',
  Web = 'Web',
  WhatsApp = 'WhatsApp',
  Admin = 'Admin'
}

export enum OrderStatusEnum {
  Pending,
  Completed,
  Cancelled
}

export enum DurationTypeEnum {
  Day = 'Day',
  Month = 'Month'
}

export enum BonusTypeEnum {
  SignupBonus = 'SignupBonus',
  OtherBonus = 'OtherBonus'
}
