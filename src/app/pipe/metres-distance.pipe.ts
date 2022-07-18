import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metresDistance'
})
export class MetresDistancePipe implements PipeTransform {

  
  transform(value: number): string {
    if(value){

      if(value / 1000 >= 1){
        return (value / 1000).toFixed(2) + ' km';
      } else{
        return parseInt(value + '') + ' mt';
      }
    }

    return '';
  }

}
