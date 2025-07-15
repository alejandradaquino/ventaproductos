import {UsersService} from './users.service';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError } from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class LoggedHttpService {

  constructor(private http: HttpClient, private userService: UsersService) {}

  post(url: string, body: any): Observable<Object> {
    let headers = new HttpHeaders();
    if(this.userService.isLoggedUser()){
      headers = new HttpHeaders().set('Http-Token', this.userService.getToken())
      .set('Http-Id-Company', '' + this.userService.getLoggedUser().idCompany)
    }
    return this.http.post(url, body, { headers }).pipe(catchError((error: any) => {
      if (error.status <= 403) {
        this.userService.logout();
      }
      return throwError(() => new Error(error.status));
    }));
  }

  get(url: string): Observable<Object> {
    let headers = new HttpHeaders();
    if(this.userService.isLoggedUser()){
      headers = new HttpHeaders().set('Http-Token', this.userService.getToken())
      .set('Http-Id-Company', '' + this.userService.getLoggedUser().idCompany)
    }
   return this.http.get(url, {
      headers
    }).pipe(catchError((error: any) => {
      if (error.status <= 403) {
        this.userService.logout();
      }
      return throwError(() => new Error(error.status));
    }));
  }

}
