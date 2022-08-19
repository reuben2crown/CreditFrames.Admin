import { BaseModel } from "./base-model";
import { UserModel } from "./user-model";

export class PaymentModel extends BaseModel {
    public userId: string;
    public referenceNumber: string;
    public invoiceNumber: string;
    public paymentGateway: string;
    public paymentPlanId: number;
    public paymentPlanTitle: number;
    public noOfConsultation: number;
    public validityPeriodInMonth: number;
    public amount: number;
    public amountPaid: number;
    public paymentDate: Date | string;    
    public expiryDate: Date | string;
    public paymentCardId: string;
    public email: string;
    public paymentChannel: string;
    public responseMessage: string;
    public status: string;
    public narration: string;
    public isCompleted: boolean;
    public tranId: number;
    public paymentType: string;
    public currency: string;
    public phoneNumber: string;
    public ussdAccountBankCode: string;
    public ussdAccountBankName: string;
    public ussdNote: string;
    public ussdPaymentCode: string;
    public user: UserModel;
}

export class PaymentCardModel extends BaseModel {
    public userId: number
    public user: UserModel;
    public cardType: string
    public cardLast4Number: string
    public expiryMonth: string
    public expiryYear: string
    public bank: string
    public channel: string
    public reusable: boolean
    public countryCode: string
}

export class InitiatePayment{
    public userId: number;
    public orderId: number;
    public paymentProvider: string;
}

export class PaymentResponseModel {
    public publicKey: string;
    public clientSecret: string;
    public amount: number;
}

export class PaymentPlanModel extends BaseModel {
    public title: string;
    public noOfConsultation: number;
    public durationInMonth: number;
    public amount: number;
    public isActive: boolean;
    public createdBy: string;
    public editedBy: string;
}

export class PaymentPlanFormModel {
    public id: number;
    public title: string;
    public noOfConsultation: number;
    public durationInMonth: number;
    public amount: number;
    public createdBy: string;
    public editedBy: string;
  }
  