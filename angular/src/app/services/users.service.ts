import {User} from '../model/user';
import {EnvironmentService} from './environment.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable, BehaviorSubject} from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { Order } from '../model/order';

@Injectable()
export class UsersService {
  observableUser = new BehaviorSubject(this.getLoggedUser());
  observableOrder = new BehaviorSubject(new Order());

  constructor(private http: HttpClient, private environment: EnvironmentService) {}

  getObservableUser() {
    return this.observableUser;
  }
  getObservableOrder() {
    return this.observableOrder;
  }

  login(user: User): Observable<User> {
    return this.http.post(this.environment.userLogin(), user)
    .pipe(map((res:any) => { //provemp1
      user = new User(res.user);
      const token = res.token;
      localStorage.setItem('loggeduser', JSON.stringify(res.user));
      localStorage.setItem('token', token);
      localStorage.setItem('company', JSON.stringify(user.company));
      this.observableUser.next(user);
      return user;
    }));
  }

  logout() {
    if(this.isLoggedUser()){
      localStorage.setItem('loggeduser', null);
      localStorage.setItem('token', null);
      localStorage.setItem('company', null);
      this.observableUser.next(new User());
    }
  }

  isLoggedUser(): boolean {
    return this.getLoggedUser().id !== undefined;
  }

  isCompanyLoggedUser(): boolean {
    return this.isLoggedUser() && !this.getLoggedUser().isBackoffice();
  }

  isBackofficeLoggedUser(): boolean {
    return this.isLoggedUser() && this.getLoggedUser().isBackoffice();
  }

  getLoggedUser(): User {
    const storedInfo = localStorage.getItem('loggeduser');
    if(storedInfo==='' && storedInfo === undefined && storedInfo === null){
      return new User();
    }
    try{
      return new User(JSON.parse(storedInfo));
    }catch{
      console.log("loginout", storedInfo);
      localStorage.setItem('loggeduser', null);
      localStorage.setItem('token', null);
      localStorage.setItem('company', null);
      return new User();
    }
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

}
