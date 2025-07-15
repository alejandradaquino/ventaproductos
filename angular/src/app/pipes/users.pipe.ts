import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user';

@Pipe({
  name: 'users'
})
export class UsersPipe implements PipeTransform {

  transform(items: Array<User>, fullName: string, email:string, idCompany: string): any {
    return items.filter(item => {
      const idCompanyMatches = idCompany === undefined || idCompany === '' || item.idCompany ==   parseInt(idCompany);
      const nameMatches = fullName === undefined || fullName === '' || item.fullName.toUpperCase().indexOf(fullName.toUpperCase()) >= 0;
      const emailMatches = email === undefined || email === '' || item.email.toUpperCase().indexOf(email.toUpperCase()) >= 0;
      return nameMatches && idCompanyMatches && emailMatches;
    });
  }
}
