import { Order } from '../model/order';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orders'
})
export class OrdersPipe implements PipeTransform {

  
  transform(items: Array<Order>, companyName: string, orderNumber: string): any {
    return items.filter(item => {
      const companyIsPresent = companyName ? true : false;
      const numberMatches = orderNumber === undefined || orderNumber === '' || item.orderNumber.toUpperCase().indexOf(orderNumber.toUpperCase()) >= 0;
      if(companyIsPresent){
        const companyMatches = companyName === undefined || companyName === '' || (item.companyName!==null && item.companyName.toUpperCase().indexOf(companyName.toUpperCase()) >= 0);
        return companyMatches && numberMatches;
      }else{
         return numberMatches;
      }
    });
  }


}
