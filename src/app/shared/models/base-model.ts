export class BaseModel {
  public id: number;
  public createdDate?: Date;
  public updatedDate?: Date;
}

export class PersonModel extends BaseModel {
  public firstName: string;
  public lastName: string;
  public emailAddress: string;
  public phoneNumber: string;
}
