import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'celsuis'
})
export class CelsuisPipe implements PipeTransform {

  transform(value: number, unit: string) {

          if(value && !isNaN(value)){

                 if(unit === 'C'){
                   var tempareature = (value - 32) / 1.8 ;
                   return tempareature.toFixed(2);
                 }
          }
    return;
  }

}
