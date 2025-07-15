import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../../model/company';
import { Article } from '../../model/article';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-price',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {

  @Input()
  company: Company;

  @Input()
  article: Article;

  constructor() { }

  ngOnInit() {
  }

  getPrice() {
    const findedPrice = this.article.findPrice(this.company.idPriceList);
    return (!this.isPublicList() ? findedPrice.priceWithoutIva() : findedPrice.value);
  }

  getDefaultPrice(){
    const findedPrice = this.article.defaultPrice;
    return (!this.isPublicList() ? this.priceWithoutIva(findedPrice) : findedPrice);
  }

  public priceWithoutIva(findedPrice:number): number {
    console.log(findedPrice, (Math.round((findedPrice / 1.21) * 100) / 100) );
    return (Math.round((findedPrice / 1.21) * 100) / 100) ;
  }
  isPublicList() {
    return this.company.idPriceList == undefined || this.company.idPriceList == 0;
  }
}
