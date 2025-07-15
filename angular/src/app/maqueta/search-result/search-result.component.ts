import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { BaseComponent } from '../../services/BaseComponent';
import { Article } from '../../model/article';
import { CommonModule } from '@angular/common';
import { ArticleBoxComponent } from '../../components/article-box/article-box.component';

@Component({
  selector: 'app-search-result',
  standalone:true,
  imports:[CommonModule, ArticleBoxComponent],
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
  providers: [CatalogService]
})
export class SearchResultComponent extends BaseComponent implements OnInit {

  articles: Article[] = [];
  value: string;
  constructor(private route: ActivatedRoute,
    private catalogService: CatalogService) {
      super();
     }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.value = params['value'];
      this.catalogService.findArticlesBy(  this.value ).subscribe(articles => {
        this.articles = articles;
  
      }, (error) => {
        console.log(error);
        this.showError();
      });
    });
  }

}
