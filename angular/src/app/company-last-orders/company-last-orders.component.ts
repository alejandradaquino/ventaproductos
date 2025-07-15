import {Company} from '../model/company';
import {Order} from '../model/order';
import {OrderService} from '../services/order.service';
import {Component, OnInit, Input} from '@angular/core';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailImageComponent } from '../components/detail-image/detail-image.component';

@Component({
  selector: 'app-company-last-orders',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    DetailImageComponent
  ],
  templateUrl: './company-last-orders.component.html',
  styleUrls: ['./company-last-orders.component.css'],
  providers: [OrderService]
})
export class CompanyLastOrdersComponent implements OnInit {

  company: Company;
  companyId: number;
  orders: Order[] = [];
  constructor(private orderService: OrderService, private userService: UsersService) {}

  ngOnInit() {
    this.userService.getObservableUser().subscribe({
      next: user => {
        if(user.id>0){

          this.company = user.company;
          this.companyId = user.idCompany;
          this.orderService.getLastOrders(this.companyId).subscribe(orders => {
            this.orders = orders;
          });
        }else {
          this.orders = [];
        }

      }
    })
  }

}
