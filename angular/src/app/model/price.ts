export class Price {
  public idPriceList: number;
  public value: number;
  public default = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public priceWithoutIva(): number {
    return this.default ? (Math.round((this.value / 1.21) * 100) / 100) : this.value;
  }

}
