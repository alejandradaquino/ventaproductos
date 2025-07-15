import { CommonModule } from '@angular/common';
import {Order} from '../../model/order';
import {OrderService} from '../../services/order.service';
import {UsersService} from '../../services/users.service';
import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../../components/message/message.component';
import { OrdersPipe } from '../../pipes/orders.pipe';
import { DetailImageComponent } from '../../components/detail-image/detail-image.component';

@Component({
  selector: 'app-last-orders',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    OrdersPipe,
    DetailImageComponent
  ],
  templateUrl: './last-orders.component.html',
  styleUrls: ['./last-orders.component.css'],
  providers: [OrderService]
})
export class LastOrdersComponent implements OnInit {

  orders: Order[] = [];
  filterOrder: Order = new Order();
  constructor(private orderService: OrderService, private userService: UsersService) {}

  ngOnInit() {
    this.userService.getObservableUser().subscribe({next: user => this.refresh()});
  }

  refresh() {
    if (this.userService.isBackofficeLoggedUser()) {
      this.orderService.getAllOrders().subscribe(orders => this.orders = orders);
    } else {
      this.orders = [];
    }
  }

}
