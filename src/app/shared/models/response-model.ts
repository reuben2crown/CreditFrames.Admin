export class ResponseModel {
    status: boolean;
    message: string;
    error?: any[];
}

export class DataResponseModel<T> extends ResponseModel {
    data?: T;
}
