export class Configuration {
  public id: number;
  public email: string;
  public telefono: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
