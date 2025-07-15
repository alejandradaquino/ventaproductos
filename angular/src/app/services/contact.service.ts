import {Configuration} from '../model/configuration';
import {Message} from '../model/message';
import {EnvironmentService} from './environment.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class ContactService {

  constructor(private http: HttpClient, private environment: EnvironmentService) {}

  findConfiguration(): Observable<Configuration> {
    return this.http.get(this.environment.getContactUrl()).pipe(map(this.toConfiguration));
  }

  sendMessage(message: Message): Observable<{}> {
    return this.http.post(this.environment.getContactUrl(), message);
  }


  toConfiguration(res): Configuration {
    return new Configuration(res);
  }

}

