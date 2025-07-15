export class Message {
  public companyname: string;
  public username: string;
  public message: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
