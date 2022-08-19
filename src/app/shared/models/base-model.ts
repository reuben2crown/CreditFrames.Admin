export class BaseModel {
  public id: number;
  public createdDate?: Date;
  public updatedDate?: Date;
}

export class PersonModel extends BaseModel {
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;
}
