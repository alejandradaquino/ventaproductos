import { Article } from "./article";
import { Company } from "./company";
import { PriceList } from "./priceList";

export class Detail {
  id: number;
  idArticle: number;
  name: string;
  code: string;
  imgPath: string;
  price: number = 0;
  quantity: number = 0;
  article: Article;

  constructor(values: Object = {}) {
    Object.assign(this, values);
    this.article = new Article(this.article);
  }

  getTotal(): number {
    return this.quantity * this.price;
  }

  recalculatePrice(priceListId: number) {
    this.price = this.article.findPrice(priceListId).value;
  }

  validate() {
    if (this.idArticle === undefined || this.idArticle === 0) {
      return 'El detalle de artículo está incompleto';
    }
    if (this.quantity === undefined || this.quantity === 0) {
      return 'La cantidad del artículo ' + this.name + ' debe ser mayor a cero';
    }
    if (this.price === undefined || this.price <= 0) {
      return 'El precio del artículo ' + this.name + ' es incorrecto';
    }
    return 'OK';
  }
}
