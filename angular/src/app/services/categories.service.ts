import { Injectable } from '@angular/core';
import { LoggedHttpService } from './logged-http.service';
import { EnvironmentService } from './environment.service';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Category } from '../model/category';

@Injectable()
export class CategoriesService {


  constructor(private http: LoggedHttpService, private environment: EnvironmentService) { }

  findAll(): Observable<Category[]> {
    return this.http.get(this.environment.findAllCategories())
      .pipe(map((list:[])=> list.map(json => new Category(json))));
  }

  save(category: Category): Observable<string> {
    return this.http.post(this.environment.saveCategory(), category)
      .pipe(map(json => json['status']));
  }

  delete(category: Category): Observable<string> {

    return this.http.get(this.environment.deleteCategory(category.id))
    .pipe(map(json => json['status']));
  }
}
