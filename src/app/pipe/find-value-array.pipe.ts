import { Pipe, PipeTransform } from '@angular/core';
import { Dictionary } from 'lodash';

@Pipe({
  name: 'findValueArray'
})
export class FindValueArrayPipe implements PipeTransform {

  /**
   * value[property[0]][property[1]]
   * @param value 
   * @param property 
   */
  transform(value: Object, property: string[]) {
    let index: number = 0
    property.forEach(element => {
      let valueElem = value as Dictionary<any>
      if (valueElem[element]) {
        value = valueElem[element];
        element
        index++;
      }
    });
    value = value ? value : '';

    if (index == property.length) {
      return value;
      // return this.camelSentence(value + '');
    } else {
      return '';
    }
  }

  camelSentence(str:string) {
    return (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
      return chr.toUpperCase();
    });
  }

  // find(value: Object, property: string[]): string {
  //   let index: number = 0
  //   property.forEach(element => {
  //     if (value[element]) {
  //       value = value[element];
  //       element
  //       index++;
  //     }
  //   });
  //   value = value ? value : '';

  //   if (index == property.length) {
  //     return value +'';
  //   } else {
  //     return '';
  //   }
  // }

}
