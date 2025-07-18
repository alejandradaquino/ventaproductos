import { Article } from '../model/article';
import { Detail } from '../model/detail';
import { Order } from '../model/order';
import { EnvironmentService } from './environment.service';
import { LoggedHttpService } from './logged-http.service';
import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Company } from '../model/company';
import { User } from '../model/user';
import { map } from "rxjs/operators";
@Injectable()
export class OrderService {

  constructor(
    private userService: UsersService,
    private envionment: EnvironmentService,
    private http: LoggedHttpService) {

    this.userService.getObservableOrder().next(this.getOrderInCurse());
    this.userService.getObservableUser().subscribe({
      next: user => {
        if (user.id > 0) {
          this.recalculatePrices(user.idPriceList);
        } else {
          this.recalculatePrices();
        }
      }
    })
  }
  private recalculatePrices(priceListId: number = 0) {
    let order = this.getOrderInCurse();
    order.details.forEach(d => {
      d.recalculatePrice(priceListId);
    });
    this.saveOrder(order);
  }

  getObservableOrder() {
    return this.userService.getObservableOrder();
  }
  isOrderInCurse(): boolean {
    return localStorage.getItem('currentOrder') !== ''
      && localStorage.getItem('currentOrder') !== undefined
      && localStorage.getItem('currentOrder') !== null;
  }

  createOrder() {
    const loggedUser = this.userService.getLoggedUser();
    const order = new Order({
      companyId: loggedUser.idCompany,
      requesterUserId: loggedUser.id,
      date: new Date()
    });
    this.saveOrder(order);
    return order;
  }

  saveOrder(order: Order) {
    localStorage.setItem('currentOrder', JSON.stringify(order));
    this.getObservableOrder().next(order);
  }

  addDetail(article: Article, quantity: number, company: Company) {
    const order = this.isOrderInCurse() ? this.getOrderInCurse() : this.createOrder();
    const findedPrice = article.findPrice(company.idPriceList);
    const detail = new Detail({
      name: article.name + article.description + " (" + article.wallapopLink + ")",
      idArticle: article.id,
      article: article,
      code: article.code,
      imgPath: article.imgPath,
      price: this.getPriceFor(company.idPriceList, article),
      quantity: quantity
    });


    order.addDetail(detail);
    this.saveOrder(order);
  }

  getPriceFor(idPriceList: number, article: Article): Number {
    const findedPrice = article.findPrice(idPriceList);
    return (idPriceList!== undefined && idPriceList != 0 ? findedPrice.priceWithoutIva() : findedPrice.value);
  }

  getOrderInCurse(): Order {
    return new Order(JSON.parse(localStorage.getItem('currentOrder')));
  }

  remove(detail: Detail) {
    if (this.isOrderInCurse()) {
      const order = this.getOrderInCurse();
      order.remove(detail);
      this.saveOrder(order);
    }
  }

  clearOrder() {
    localStorage.removeItem('currentOrder');
    this.getObservableOrder().next(new Order());
  }

  sendOrder(order: Order, user: User): Observable<{}> {
    order.requesterName = user.fullName;
    order.requesterUserId = user.id;
    order.companyId = user.idCompany;
    this.saveOrder(order);

    return this.http.post(this.envionment.saveOrder(), this.getOrderInCurse()).pipe(map(response => {
      this.clearOrder();
      return response;
    }));
  }

  getLastOrders(companyId: number): Observable<Order[]> {
    return this.http.get(this.envionment.findOrdersByCompany(companyId)).pipe(map(this.mapOrders));
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get(this.envionment.findAllOrders()).pipe(map(this.mapOrders));
  }

  mapOrders(res: any): Order[] {
    const objects = res;
    const orders: Order[] = [];
    for (let index = 0; index < objects.length; index++) {
      orders.push(new Order(objects[index]));
    }
    return orders;
  }
}

