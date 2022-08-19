import { BaseModel } from './base-model';

export class SettingModel extends BaseModel{
    key: string;
    value: string;
    inputType: string;
    isEditable: boolean;
    editorName: string;
}

export class SettingFormModel {
    id: number;
    key: string;
    value: string;
    inputType: string;
    isEditable: boolean;
    editorName: string;
}
