export class Banner {

  id: number;
  imagePath: string;
  url: string;
  order: number;
    
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
