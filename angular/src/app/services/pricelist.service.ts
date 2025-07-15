import {PriceList} from '../model/priceList';
import {EnvironmentService} from './environment.service';
import { LoggedHttpService } from './logged-http.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class PricelistService {

  constructor(private http: LoggedHttpService, private environment: EnvironmentService) {}

  findAll(): Observable<PriceList[]> {
    return this.http.get(this.environment.findAllPriceLists()).pipe(map(this.mapResponse));
  }

  save(article: PriceList): Observable<string> {
    return this.http.post(this.environment.savePriceList(), article).pipe(map((res:any) => res['status']));
  }
  
  mapResponse(res: any): PriceList[] {
    const objects = res;
    const priceLists: PriceList[] = [];
    for (let index = 0; index < objects.length; index++) {
      priceLists.push(new PriceList(objects[index]));
    }
    return priceLists;
  }

}
