import { Price } from './price';
export class Article {
  id: number = 0;
  name: string = "";
  code: string = "";
  axionCode: string = "";
  specifications: string = "";
  imgPath: string = "";
  defaultPrice: number = 0;
  prices: Price[];
  categoryId: number = 0 ;
  subcategoryId: number = 0;

  constructor(values: Object = {}) {
    Object.assign(this, values);
    if (this.prices === undefined) {
      this.prices = [];
    }
    this.prices = this.prices.map (p => new Price(p));
  }

  get description(): string {
    if (this.specifications !== undefined && this.specifications != "") {
      return this.specifications;
    } else {
      return this.name;
    }
  }

  findPrice(idPriceList: number): Price {
    let price = this.prices.find(p => p.idPriceList === idPriceList);
    if (price === undefined) {
        price = new Price({ idPriceList: idPriceList, value: this.defaultPrice, default: true });
      this.prices.push(price);
    }
    return price;
  }

  hasDiscount(idPriceList: number): boolean {
    return this.defaultPrice != this.findPrice(idPriceList).value;
  }

  findExistentPrice(idPriceList: number): Price {
    return this.prices.find(p => p.idPriceList === idPriceList);
  }

  validate(): string {
    if (!this.name) {
      return 'Complete el nombre';
    }
    if (!this.code) {
      return 'Complete el codigo';
    }
    if (!this.categoryId) {
      return 'Complete la categoría';
    }
    return '';
  }
}
