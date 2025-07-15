import { Article } from './article';
import { Detail } from './detail';
export class Order {
  id: number;
  companyId: number;
  companyName: string;
  orderNumber: string;
  address: string;
  costCenter: string;
  observations: string;
  requesterUserId: number;
  requesterName: string;
  date: Date;
  details: Detail[] = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
    const details: Detail[] = [];
    this.details.forEach(d => details.push(new Detail(d)));
    this.details = details;
    this.date = new Date(this.date);
  }

  getTotal(): number {
    return this.details.map(d => d.getTotal()).reduce((a, b) => a + b, 0);
  }

  getTotalWithIva():number{
    return this.details.filter(d => d.price === d.article.defaultPrice).map(d => d.getTotal()).reduce((a, b) => a + b, 0);
   }
   getTotalWithoutIva():number{
    return this.details.filter(d => d.price !== d.article.defaultPrice).map(d => d.getTotal()).reduce((a, b) => a + b, 0);
   }

  addDetail(detail: Detail) {
    const toRemove: Detail[] = [];
    this.details.filter(d => d.idArticle === detail.idArticle).forEach(d => toRemove.push(d));
    toRemove.forEach(d => {
      const index = this.details.indexOf(d, 0);
      if (index > -1) {
        this.details.splice(index, 1);
      }
    });
    if (detail.quantity >= 0) {
      this.details.push(detail);
    }
  }

  findDetail(article: Article) {
    const filtered = this.details.filter(d => d.idArticle === article.id);
    if (filtered.length > 0) {
      return filtered[0];
    }
    return new Detail();
  }

  remove(detail: Detail) {
    const toRemove: Detail[] = [];
    this.details.filter(d => d.idArticle === detail.idArticle).forEach(d => toRemove.push(d));
    toRemove.forEach(d => {
      const index = this.details.indexOf(d, 0);
      if (index > -1) {
        this.details.splice(index, 1);
      }
    });
  }
  validate() {
    if (this.companyId == 2 && (this.orderNumber === undefined || this.orderNumber === '')) {
      return 'Complete el número de orden';
    }
    if (this.address === undefined || this.address === '') {
      return 'Complete la dirección';
    }
    if (this.companyId == 2 && (this.costCenter === undefined || this.costCenter === '')) {
      return 'Complete el centro de costos';
    }
    if (this.companyId == 2 && (this.observations === undefined || this.observations === '')) {
      return 'Complete las observaciones';
    }
    if (this.details.length === 0) {
      return 'El pedido no tiene artículos';
    }
    for (let detail of this.details) {
      const detailmsg = detail.validate();
      if (detailmsg !== 'OK') {
        return detailmsg;
      }
    }
    return 'OK';
  }
}

