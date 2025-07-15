import { User } from '../model/user';
import { EnvironmentService } from './environment.service';
import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient, private environmentService: EnvironmentService, private userService: UsersService) {}

  login(company: number, email: string, password: string): Observable<User> {
    return this.userService.login(new User({company: company, email: email, password_: password})).pipe(map(user => {
      localStorage.setItem('loggedUser', JSON.stringify(user));
      return user;
    }));
  }

}
