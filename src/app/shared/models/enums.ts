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

export enum LoanSecurityEnum
{
    None,
    Guarantor,
    Asset
}

export enum LoanRequirementEnum
{
    // [Display(Name = "Smart Phone")]
    SmartPhone = 1,
    // [Display(Name = "Bank Statement")]
    BankStatement,
    // [Display(Name = "Debit Card")]
    DebitCard,
    // [Display(Name = "Utility Bill")]
    UtilityBill,
    // [Display(Name = "Government ID")]
    GovtID,
    // [Display(Name = "Account Domicile")]
    AccountDomicile
}

export const LoanRequirementLabel = new Map<string, string>([
  [LoanRequirementEnum[LoanRequirementEnum.SmartPhone], 'Smart Phone'],
  [LoanRequirementEnum[LoanRequirementEnum.BankStatement], 'Bank Statement'],
  [LoanRequirementEnum[LoanRequirementEnum.DebitCard], 'Debit Card'],
  [LoanRequirementEnum[LoanRequirementEnum.UtilityBill], 'Utility Bill'],
  [LoanRequirementEnum[LoanRequirementEnum.GovtID], 'Government ID'],
  [LoanRequirementEnum[LoanRequirementEnum.AccountDomicile], 'Account Domicile']
]);
