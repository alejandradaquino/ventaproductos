import { CommonModule } from '@angular/common';
import { Article } from '../model/article';
import { Company } from '../model/company';
import { BaseComponent } from '../services/BaseComponent';
import { CatalogService } from '../services/catalog.service';
import { EnvironmentService } from '../services/environment.service';
import { OrderService } from '../services/order.service';
import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../components/message/message.component';
import { ArticleBoxComponent } from '../components/article-box/article-box.component';

@Component({
  selector: 'app-company-catalog',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    ArticleBoxComponent
  ],
  templateUrl: './company-catalog.component.html',
  styleUrls: ['./company-catalog.component.css'],
  providers: [CatalogService, EnvironmentService, OrderService]
})
export class CompanyCatalogComponent extends BaseComponent implements OnInit {

  @Input()
  company: Company;
  articles: Article[] = [];
  categoryName = '';

  constructor(private route: ActivatedRoute,
    private catalogService: CatalogService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let subcategoryId = +params['subcategoryId'];
      let categoryId = +params['categoryId'];
      this.categoryName = params['name'];
      if (subcategoryId !== undefined && subcategoryId > 0) {
        this.loadSubcategory(subcategoryId);
      } else if (categoryId !== undefined) {
        this.loadCategory(categoryId);
      }
    });
  }
  loadCategory(categoryId: number) {
    this.catalogService.findArticlesByCategory(categoryId).subscribe(articles => {
      this.articles = articles;

    }, (error) => {
      console.log(error);
      this.showError();
    });
  }
  loadSubcategory(subcategoryId: number) {
    this.catalogService.findArticlesBySubategory(subcategoryId).subscribe(articles => {
      this.articles = articles;
    }, (error) => {
      console.log(error);
      this.showError();
    });
  }


}
