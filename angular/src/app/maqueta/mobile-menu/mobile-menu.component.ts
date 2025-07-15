import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../model/category';
import { CatalogService } from '../../services/catalog.service';
import { UsersService } from '../../services/users.service';
import { Order } from '../../model/order';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../components/search/search.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  standalone:true,
  imports:[CommonModule,RouterModule, SearchComponent],
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css'],
  providers: [CatalogService, UsersService, OrderService]
})
export class MobileMenuComponent implements OnInit {

  @Input()
  categories: Category[] = []
  isBackofficeUser = false;

  order: Order = new Order();

  constructor(private userService: UsersService, private orderService: OrderService) { }

  ngOnInit() {
    this.isBackofficeUser = this.userService.isBackofficeLoggedUser();

    this.order = this.orderService.getOrderInCurse();
    this.orderService.getObservableOrder().subscribe(order => {
      this.order = order;
    });
  }

  collapse() {
    eval("$('#navbarSupportedContent').collapse('hide')");
  }
}
