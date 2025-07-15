import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../model/article';
import { UsersService } from '../../services/users.service';
import { OrderService } from '../../services/order.service';
import { Company } from '../../model/company';
import { BaseComponent } from '../../services/BaseComponent';
import { CatalogService } from '../../services/catalog.service';
import { MessageComponent } from '../../components/message/message.component';
import { ArticleImageComponent } from '../../components/article-image/article-image.component';
import { PriceComponent } from '../../components/price/price.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlusLessComponent } from '../../components/plus-less/plus-less.component';

@Component({
  selector: 'app-article',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    MessageComponent,
    ArticleImageComponent,
    PriceComponent,
    PlusLessComponent
  ],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [CatalogService]
})
export class ArticleComponent extends BaseComponent implements OnInit {
  articleName = "";
  article: Article = new Article();
  quantity: number = 0;
  company: Company = new Company();

  constructor(private route: ActivatedRoute,
    private catalogService: CatalogService,
    private userService: UsersService,
    private orderService: OrderService) {
    super();
  }

  ngOnInit() {
   this.userService.getObservableUser().subscribe({
      next: user => this.company = user.company
    });
    this.route.params.subscribe(params => {
      let articleId = +params['articuloId'];
      this.articleName = params['name'];
      this.catalogService.findById(articleId).subscribe(article => {
        let detail = this.orderService.getOrderInCurse().details.
          find(d => d.idArticle === article.id);
        if (detail) {
          this.quantity = detail.quantity;
        }
        this.article = article;
        setTimeout(this.textAreaAdjust,5);
      });
    });
  }
  textAreaAdjust() {
    document.getElementById('textareaval').style.height = (document.getElementById('textareaval').scrollHeight + 10) +"px";
  }

  addToChart() {
    this.quantity = 1;
    this.orderService.addDetail(this.article, this.quantity, this.company);
    this.showResultOk('Agregado');
  }

  plusClicked() {
    this.quantity = this.quantity + 1;
    this.orderService.addDetail(this.article, this.quantity, this.company);
    this.showResultOk('Ok');
  }
  lessClicked() {
    this.quantity = this.quantity - 1;
    this.orderService.addDetail(this.article, this.quantity, this.company);
    this.showResultOk('Ok');
  }
}
