export class Subcategory {
  public id: number;
  public name: string;
  public categoryId: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
