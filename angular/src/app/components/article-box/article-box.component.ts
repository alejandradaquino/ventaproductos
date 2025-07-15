import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../model/article';
import { UsersService } from '../../services/users.service';
import { Company } from '../../model/company';
import { OrderService } from '../../services/order.service';
import { BaseComponent } from '../../services/BaseComponent';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../message/message.component';
import { OfferComponent } from '../../maqueta/offer/offer.component';
import { ArticleImageComponent } from '../article-image/article-image.component';
import { PriceComponent } from '../price/price.component';
import { PlusLessComponent } from '../plus-less/plus-less.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-article-box',
  standalone:true,        
  imports: [
    CommonModule,
    MessageComponent,
    OfferComponent,
    ArticleImageComponent,
    PriceComponent,
    PlusLessComponent,
    RouterModule,
  ],       
  templateUrl: './article-box.component.html',
  styleUrls: ['./article-box.component.css'],
  providers: [OrderService]
})
export class ArticleBoxComponent extends BaseComponent implements OnInit {
  @Input()
  articles: Article[] = [];
  company: Company = new Company();
  quantities: number[] = [];

  constructor(private userService: UsersService,
    
    private orderService: OrderService) {
    super();
  }

  ngOnInit() {
    this.userService.getObservableUser().subscribe({
      next: user => this.company = user.company
    });
    this.orderService.getOrderInCurse().details.forEach(d => {
      this.quantities[d.code] = d.quantity;
    })
  }

  addToChart(article: Article) {
    this.quantities[article.code] = 1;
    this.orderService.addDetail(article, this.quantities[article.code], this.company);
    this.showResultOk('Agregado');
  }
  plusClicked(article: Article) {
    this.quantities[article.code] = this.quantities[article.code]+1;
    this.orderService.addDetail(article,this.quantities[article.code] , this.company);
    this.showResultOk('Ok');
  }
  lessClicked(article: Article) {
    this.quantities[article.code] = this.quantities[article.code]-1;
    this.orderService.addDetail(article, this.quantities[article.code], this.company);
    this.showResultOk('Ok');
  }
}
