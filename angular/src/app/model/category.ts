import { Subcategory } from "./subcategory";

export class Category {
  public id: number;
  public name: string;
  public subcategories: Subcategory[] = [];
  public _showSubcategory = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  get showSubcategory(): boolean {
    return this._showSubcategory && this.subcategories.length > 1;
  }
  set showSubcategory(value: boolean) {
    this._showSubcategory = value;
  }

  addSubcategory(subcategory: Subcategory) {
    this.removeSubcategory(subcategory);
    this.subcategories.push(new Subcategory(subcategory));
  }

  removeSubcategory(subcategory: Subcategory) {
    this.subcategories = this.subcategories.filter(s => s.name != subcategory.name);
  }

  get displayable(): string {
    if (this.subcategories.length > 0) {
      return '<b>' + this.name + '</b> -> [' + this.subcategories.map(s => s.name).join(' | ') + ']';
    }
    return '<b>' + this.name + '</b>';
  }
}
