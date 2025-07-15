import {Article} from '../model/article';
import { Category } from '../model/category';
import {EnvironmentService} from './environment.service';
import { LoggedHttpService } from './logged-http.service';
import {UsersService} from './users.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class CatalogService {

  constructor(
    private environment: EnvironmentService, 
    private userService: UsersService,
    private loggedHttp: LoggedHttpService) {}

  findById(id): Observable<Article> {
    return this.loggedHttp.get(this.environment.findArticleFromCatalog(id)).pipe(map((res: any) => new Article(res)));
  }
  
  findArticles(): Observable<Article[]> {
    return this.loggedHttp.get(this.environment.findCatalogArticles()).pipe(map(this.mapResponse));
  }

  findArticlesByCategory(categoryId: number): Observable<Article[]> {
    return this.loggedHttp.get(this.environment.findAllArticlesByCategory(categoryId)).pipe(map(this.mapResponse));
  }

  findArticlesBySubategory(subcategoryId: number): Observable<Article[]> {
    return this.loggedHttp.get(this.environment.findAllArticlesBySubcategory(subcategoryId)).pipe(map(this.mapResponse));
  }

  findArticlesBy(value: string): Observable<Article[]> {
    return this.loggedHttp.get(this.environment.findAllArticlesBy(value)).pipe(map(this.mapResponse));
  }

  findRandomArticles(){
    return this.loggedHttp.get(this.environment.findRandomArticles()).pipe(map(this.mapResponse));
  }
  
  findCategories(): Observable<Category[]> {
    return this.loggedHttp.get(this.environment.findAllCategories()).pipe(map(this.mapCategoriesResponse));
  }

  mapResponse(res): Article[] {
    const objects = res;
    const articles: Article[] = [];
    for (let index = 0; index < objects.length; index++) {
      const article = new Article(objects[index]);
      articles.push(article);
    }
    return articles;
  }

  mapCategoriesResponse(res): Category[] {
    const objects = res;
    const categories: Category[] = []; 
    for (let index = 0; index < objects.length; index++) {
      categories.push(new Category(objects[index]));
    }
    return categories;
  }
}
