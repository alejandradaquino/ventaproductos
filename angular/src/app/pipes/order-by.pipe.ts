import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  standalone: true
})
export class OrderByPipe implements PipeTransform {


  value: string[] = [];

  static _orderByComparator(a: any, b: any): number {

    if (a === null || typeof a === 'undefined') { a = 0; };
    if (b === null || typeof b === 'undefined') { b = 0; };

    if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
      // Isn't a number so lower case the string to properly compare
      if (a.toLowerCase() < b.toLowerCase()) { return -1; };
      if (a.toLowerCase() > b.toLowerCase()) { return 1; };
    } else {
      // Parse strings as numbers to compare properly
      if (parseFloat(a) < parseFloat(b)) { return -1; };
      if (parseFloat(a) > parseFloat(b)) { return 1; };
    }

    return 0; // equal each other
  }

  transform(input: any, config = '+'): any {
    // make a copy of the input's reference
    this.value = [...input];
    let value = this.value;

    if (!Array.isArray(value)) { return value; };

    if (!Array.isArray(config) || (Array.isArray(config) && config.length === 1)) {
      let propertyToCheck: string = !Array.isArray(config) ? config : config[0];
      let desc = propertyToCheck.substr(0, 1) === '-';

      // Basic array
      if (!propertyToCheck || propertyToCheck === '-' || propertyToCheck === '+') {
        return !desc ? value.sort() : value.sort().reverse();
      } else {
        let property: string = propertyToCheck.substr(0, 1) === '+' || propertyToCheck.substr(0, 1) === '-'
          ? propertyToCheck.substr(1)
          : propertyToCheck;

        return value.sort(function(a: any, b: any) {
          return !desc
            ? OrderByPipe._orderByComparator(a[property], b[property])
            : -OrderByPipe._orderByComparator(a[property], b[property]);
        });
      }
    } else {
      // Loop over property of the array in order and sort
      return value.sort(function(a: any, b: any) {
        for (let i = 0; i < config.length; i++) {
          let desc = config[i].substr(0, 1) === '-';
          let property = config[i].substr(0, 1) === '+' || config[i].substr(0, 1) === '-'
            ? config[i].substr(1)
            : config[i];

          let comparison = !desc
            ? OrderByPipe._orderByComparator(a[property], b[property])
            : -OrderByPipe._orderByComparator(a[property], b[property]);

          // Don't return 0 yet in case of needing to sort by next property
          if (comparison !== 0) {
            return comparison;
          }
        }

        return 0; // equal each other
      });
    }
  }
}
