import { Company } from "./company";

export class User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  idCompany: number;
  deleted: boolean;
  company: Company;
  seeAllArticles: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
    this.company = new Company(this.company);
  }

  get idPriceList(): number {
    return this.company.idPriceList;
  }

  isBackoffice() {
    return this.idCompany == 0;
  }

  isFullAdmin() {
    return this.email === 'alejandradaquino@gmail.com';
  }
}
