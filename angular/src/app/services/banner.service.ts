import { Injectable } from '@angular/core';
import { LoggedHttpService } from './logged-http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import { EnvironmentService } from './environment.service';
import { map } from "rxjs/operators";
import { Banner } from '../model/banner';

@Injectable()
export class BannerService {


  constructor(private http: LoggedHttpService, private imagesHttp: HttpClient, private environment: EnvironmentService) {
  }

  findBanners(): Observable<Banner[]> {
    return this.http.get(this.environment.findBanners())
      .pipe(map((res: []) => res.map(b => new Banner(b))));
  }

  findAll() {
    return this.http.get(this.environment.findAllBanners()).pipe(map((res: any) =>
      res.map(json => new Banner(json))
    ));
  }

  deleteBanner(id: number) {
    return this.http.get(this.environment.deleteBanner(id));
  }

  save(banner: Banner): Observable<string> {
    return this.http.post(this.environment.saveBanner(), banner).pipe(map((res: any) => res['status']));
  }
  uploadImage(file: File, banner: Banner = null): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileToUpload', file, file.name);
    console.log(file.name);
    const headers = new HttpHeaders();
    /** No need to include Content-Type in Angular 4 */
    headers.set('Accept', 'application/json');
    return this.imagesHttp.post(this.environment.uploadBannerImage(banner), formData, { headers })
      .pipe(catchError(error => throwError(() => error)))

  }
}
