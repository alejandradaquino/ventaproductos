import {User} from '../model/user';
import {EnvironmentService} from './environment.service';
import {LoggedHttpService} from './logged-http.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class UserAdminService {

  constructor(private http: LoggedHttpService, private environment: EnvironmentService) {}

  save(user: User): Observable<string> {
    return this.http.post(this.environment.saveUser(), user).pipe(map((res:any) => res['status']));
  }

  findUsers(idCompany: number, viewDeleted: boolean): Observable<User[]> {
    return this.http.get(this.environment.findAllUsers(idCompany, viewDeleted)).pipe(map(this.mapResponse));
  }

  changePassword(oldPassword: string, newPassword: string, userId: number): Observable<Object> {
    return this.http.post(this.environment.changeUserPassword(), {
      userId: userId,
      oldPassword: oldPassword,
      newPassword: newPassword
    });
  }

  disable(userId: number): Observable<string> {
    return this.http.get(this.environment.deleteUser(userId)).pipe(map((res:any) => res['status']));
  }

  reenable(userId: number): Observable<string> {
    return this.http.get(this.environment.reenableUser(userId)).pipe(map((res:any) => res['status']));
  }
  
  resetUserPassword(userId: number): Observable<string> {
    return this.http.get(this.environment.resetUserPassword(userId)).pipe(map((res:any) => res['status']));
  }
  
  mapResponse(res: any): User[] {
    const objects = res;
    const users: User[] = [];
    for (let index = 0; index < objects.length; index++) {
      users.push(new User(objects[index]));
    }
    return users;
  }
}
