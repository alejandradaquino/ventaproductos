export class Company {

  id: number;
  name: string;
  idPriceList: number;
  addresses: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
    if (this.addresses === undefined || this.addresses === '') {
      this.addresses = '[]';
    }
  }

  get addressesList(): string[] {
    return JSON.parse(this.addresses);
  }

  set addressesList(value: string[]) {
    this.addresses = JSON.stringify(value);
  }
  add(address: string) {
    const list = this.addressesList;
    list.push(address);
    this.addresses = JSON.stringify(list);
  }
}
