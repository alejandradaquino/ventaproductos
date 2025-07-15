import { Detail } from '../model/detail';
import { Order } from '../model/order';
import { User } from '../model/user';
import { Company } from '../model/company';
import { BaseComponent } from '../services/BaseComponent';
import { EnvironmentService } from '../services/environment.service';
import { OrderService } from '../services/order.service';
import { UsersService } from '../services/users.service';
import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { Router, RouteReuseStrategy, RouterModule } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../components/message/message.component';
import { DetailImageComponent } from '../components/detail-image/detail-image.component';
import { PlusLessComponent } from '../components/plus-less/plus-less.component';
import { LoginComponent } from '../maqueta/login/login.component';

@Component({
  selector: 'app-cart',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MessageComponent,
    DetailImageComponent,
    PlusLessComponent,
    LoginComponent
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CompanyService]
})
export class CartComponent extends BaseComponent implements OnInit {

 // @ViewChildren('modal') imagesModals: QueryList<ModalComponent>;
  order: Order = new Order();
  user: User = new User();

  get company(): Company { return this.user.company }

  constructor(private userService: UsersService,
    private orderService: OrderService,
    private companyService: CompanyService,
    private environment: EnvironmentService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.order = this.orderService.getOrderInCurse();
    this.orderService.getObservableOrder().subscribe(order => {
      this.order = order;
    }
    );
    this.userService.getObservableUser().subscribe({
      next: user => this.user = user
    })
  }

  openImage(detail: Detail) {
    console.log("modal opening image")
   // this.imagesModals.toArray()[this.order.details.indexOf(detail)].open();
  }

  remove(detail: Detail) {
    this.orderService.remove(detail);
    this.order = this.orderService.getOrderInCurse();
  }

  plusClicked(detail: Detail) {
    detail.quantity++;
    this.saveOrder();
  }

  lessClicked(detail: Detail) {
    detail.quantity--;
    this.saveOrder();
  }
  saveOrder() {
    this.orderService.saveOrder(this.order);
    this.showResultOk('Actualizado');
  }

  send() {
    const msg = this.order.validate();
    if (msg !== 'OK') {
      alert(msg);
      return;
    }
    this.orderService.sendOrder(this.order, this.user).subscribe(() => {
      this.showSuccess();
      this.router.navigate(['ultimospedidos']);
    }, () => this.showError());
  }

}
