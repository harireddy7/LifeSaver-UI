import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelcase'
})
export class CamelcasePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value.indexOf(',') === -1) {
      let stringVals = value.split(' ');
      stringVals = stringVals.map(val => val.charAt(0).toUpperCase() + val.substr(1, val.length - 1));
      console.log('stringVals', stringVals);
      return stringVals.join(' ');
    } else {
      let stringVals = value.split(',');
      stringVals = stringVals.map(val => val.charAt(0).toUpperCase() + val.substr(1, val.length - 1));
      console.log('stringVals', stringVals);
      return stringVals.join(', ');
    }
  }

}
