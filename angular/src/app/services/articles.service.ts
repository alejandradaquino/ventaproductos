import {Article} from '../model/article';
import {Observable, throwError} from 'rxjs';
import {EnvironmentService} from './environment.service';
import { LoggedHttpService } from './logged-http.service';
import {Injectable} from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
export class ArticlesService {

  constructor(private http: LoggedHttpService,private imagesHttp: HttpClient, private environment: EnvironmentService) {
  }

  findById(id): Observable<Article> {
    return this.http.get(this.environment.findArticle(id)).pipe(map((res: any) => new Article(res)));
  }

  deleteArticle(id): Observable<{}> {
    return this.http.get(this.environment.deleteArticle(id));
  }

  findAll(): Observable<Article[]> {
    return this.http.get(this.environment.findAllArticles()).pipe(map(this.mapResponse));
  }
  
  updateDefaultPrices(percentage: number): Observable<{}> {
    return this.http.get(this.environment.updateDefaultPrices(percentage));
  }

  updateAllPrices(percentage: number, idPriceList: number): Observable<{}> {
    return this.http.get(this.environment.updateAllPrices(percentage, idPriceList));
  }

  save(article: Article): Observable<string> {
    return this.http.post(this.environment.saveArticle(), article).pipe(map((res:any) => res['status']));
  }

  mapResponse(res): Article[] {
    const objects = res;
    const articles: Article[] = [];
    for (let index = 0; index < objects.length; index++) {
      articles.push(new Article(objects[index]));
    }
    return articles;
  }
  uploadImage(file: File, article: Article = null): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileToUpload', file, file.name);
    console.log(file.name);
    const headers = new HttpHeaders();
    /** No need to include Content-Type in Angular 4 */
    headers.append('Accept', 'application/json');

    return this.imagesHttp.post(this.environment.uploadArticleImage(article), formData, {headers})
      .pipe(map((res:any) => res))
      .pipe(catchError(error => throwError(()=>error)))

  }

  downloadCSV(idPriceList: number){
    return  window.open(this.environment.downloadCSV(idPriceList), '_blank');;
  }
}
