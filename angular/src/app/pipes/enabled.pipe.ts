import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enabled'
})
export class EnabledPipe implements PipeTransform {

  transform(items: Array<any>, showdisabled: boolean): any {
    console.log(showdisabled);
    return items.filter(item => item.enabled || showdisabled);
  }

}
