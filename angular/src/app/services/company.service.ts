import { Company } from '../model/company';
import { EnvironmentService } from './environment.service';
import { LoggedHttpService } from './logged-http.service';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Observable, of } from 'rxjs';

@Injectable()
export class CompanyService {
  constructor(private http: LoggedHttpService, private environment: EnvironmentService) { }

  findAll(): Observable<Company[]> {
    return this.http.get(this.environment.findAllCompanies()).pipe(map(this.mapResponse));
  }

  findById(id: number): Observable<Company> {
    if (id === undefined || id === 0) {
      return of(new Company());
    }
    return this.http.get(this.environment.findCompany(id)).pipe(map((res:any) => new Company(res)));
  }

  save(company: Company): Observable<string> {
    return this.http.post(this.environment.saveCompany(), company).pipe(map((res:any) => res['status']));
  }

  mapResponse(res): Company[] {
    const objects = res;
    const companies: Company[] = [];
    for (let index = 0; index < objects.length; index++) {
      companies.push(new Company(objects[index]));
    }
    return companies;
  }
}
