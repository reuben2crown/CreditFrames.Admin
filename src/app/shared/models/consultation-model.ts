import { BaseModel } from './base-model';
import { BonusTypeEnum, DurationTypeEnum } from './enums';
import { UserModel } from './user-model';

export class ConsultationModel extends BaseModel {
    public userId: number;
    public phoneNumber: string;
    public agent: string;
    public ticketUrl: string;
    public isFree: boolean;
    public user: UserModel;
}

export class ConsultationTopupModel {
    public phoneNumber: string;
    public noOfConsultation: number;
    public durationType: DurationTypeEnum;
    public duration: number;
    public reason: string;
    public adminUserId: number;
}

export class AddBonusConsultationModel {
    public limit: number;
    public bonusType: BonusTypeEnum;
    public adminUserId: number;
}

