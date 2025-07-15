import { Component, OnInit, Input } from '@angular/core';
import { EnvironmentService } from '../../services/environment.service';
import { Article } from '../../model/article';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-image.component.html',
  styleUrls: ['./article-image.component.css']
})
export class ArticleImageComponent implements OnInit {

  @Input()
  article: Article = new Article();

  @Input()
  minHeight='200px';

  constructor(private environment: EnvironmentService) { }

  ngOnInit() {
  }

  getImage(article: Article): string {
    return this.environment.getArticleImageSrc(article.imgPath);
  }
}
