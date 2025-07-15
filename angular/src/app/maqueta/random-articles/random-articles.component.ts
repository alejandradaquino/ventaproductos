import { Component, OnInit, Input } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { Article } from '../../model/article';
import { CommonModule } from '@angular/common';
import { ArticleBoxComponent } from '../../components/article-box/article-box.component';

@Component({
  selector: 'app-random-articles',
  standalone:true,
  imports:[CommonModule, ArticleBoxComponent],
  templateUrl: './random-articles.component.html',
  styleUrls: ['./random-articles.component.css'],
  providers: [CatalogService]
})
export class RandomArticlesComponent implements OnInit {

  @Input()
  shown:boolean = false;

  articles: Article[] = [];
  constructor(private catalogService: CatalogService) { }

  ngOnInit() {
    if(this.shown){

      this.catalogService.findRandomArticles().subscribe(a => this.articles = a);
    }
  }

}
