import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../model/order';
import { Detail } from '../../model/detail';
import { CommonModule } from '@angular/common';
import { DetailImageComponent } from '../../components/detail-image/detail-image.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-order-preview',
  standalone:true,
  imports:[CommonModule,RouterModule, DetailImageComponent],
  templateUrl: './order-preview.component.html',
  styleUrls: ['./order-preview.component.css']
})
export class OrderPreviewComponent implements OnInit {

  order: Order = new Order();
  visible=false;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.order = this.orderService.getOrderInCurse();
    this.orderService.getObservableOrder().subscribe(order => {
        this.order = order;
      }
    );

  }


  remove(detail: Detail) {
    this.orderService.remove(detail);
  }

}
