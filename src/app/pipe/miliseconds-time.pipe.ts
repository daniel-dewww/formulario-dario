import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilTranslate } from '../util/utilTranslate';
import { Languaje } from '../class/enum/enumEstados';

@Pipe({
  name: 'milisecondsTime'
})
export class MilisecondsTimePipe implements PipeTransform {

  lang: string;
  constructor(
    private readonly translate: TranslateService
  ) {
    this.lang = translate.currentLang;
  }

  transform(value: number, type: string, onlyNumber?:boolean): string {
    onlyNumber = (onlyNumber)? true : false;
    
    if (value) {
      const seconds = Math.floor(value) / 1000;

      if (seconds < 29) {// less than 30 seconds ago will show as 'Just now'
        return this.returnTraducctionOfIntervals('just_now', type);
      }
      
      const intervals: {  [ unit : string ] : number  } = {
        'YEAR': 31536000,
        'MONTH': 2592000,
        'WEEK': 604800,
        'DAY': 86400,
        'HOUR': 3600,
        'MINUTE': 60,
        'SECOND': 1
      };
      
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
          if (counter === 1) {
            return this.returnTraducctionOfIntervals(i, type, counter, false, onlyNumber); // singular (1 day ago)
          } else {
            return this.returnTraducctionOfIntervals(i, type, counter, true, onlyNumber); // plural (2 days ago)
          }
      }
    }

    return '';
  }


  returnTraducctionOfIntervals(word: string, type?: string, counter?: number, plurals?: boolean, onlyNumber?:boolean): string {
    switch (word) {
      case 'just_now':
        return UtilTranslate(['PIPE', 'MILISECOND_TIME', 'JUST_NOW'], this.translate.translations[this.translate.currentLang]);
        break;
      case 'YEAR':
        return this.singularPluralsWordTraslate(counter!, word, type!, plurals, onlyNumber);
        break;
      case 'MONTH':
        return this.singularPluralsWordTraslate(counter!, word, type!, plurals, onlyNumber);
        break;
      case 'WEEK':
        return this.singularPluralsWordTraslate(counter!, word, type!, plurals, onlyNumber);
        break;
      case 'DAY':
        return this.singularPluralsWordTraslate(counter!, word, type!, plurals, onlyNumber);
        break;
      case 'HOUR':
        return this.singularPluralsWordTraslate(counter!, word, type!, plurals, onlyNumber);
        break;
      case 'MINUTE':
        return this.singularPluralsWordTraslate(counter!, word, type!, plurals, onlyNumber);
        break;
      case 'SECOND':
        return this.singularPluralsWordTraslate(counter!, word, type!, plurals, onlyNumber);
        break;
      default:
        return '';
        break
    }
  }

  singularPluralsWordTraslate(counter: number, word: string, type: string, plurals?: boolean, onlyNumber?: boolean): string {
    let ago: string = '';
    
    if(!onlyNumber){
      ago = UtilTranslate(['PIPE', 'MILISECOND_TIME', 'AGO'], this.translate.translations[this.translate.currentLang]);
    }
    
    if (this.translate.currentLang == Languaje.ES) {
      switch (type) {
        case 'ABBREVIATION':
          if(!onlyNumber){
            ago = UtilTranslate(['PIPE', 'MILISECOND_TIME', 'A_MINUTES'], this.translate.translations[this.translate.currentLang]);
          }
          return ago + ' ' + counter + ' ' + UtilTranslate(['PIPE', 'MILISECOND_TIME', 'ABBREVIATION', word], this.translate.translations[this.translate.currentLang]);
          break;
        default:
          if (plurals) {
            return ago + ' ' + counter + ' ' + UtilTranslate(['PIPE', 'MILISECOND_TIME', 'PLURAL', word], this.translate.translations[this.translate.currentLang]);
          } else {
            return ago + ' ' + counter + ' ' + UtilTranslate(['PIPE', 'MILISECOND_TIME', 'SINGULAR', word], this.translate.translations[this.translate.currentLang]);
          }

          break;
      }
    } else {
      switch (type) {
        case 'ABBREVIATION':
          return ago + ' ' + counter + ' ' + UtilTranslate(['PIPE', 'MILISECOND_TIME', 'ABBREVIATION', word], this.translate.translations[this.translate.currentLang]);
          break;
        default:
          if (plurals) {
            return counter + ' ' + UtilTranslate(['PIPE', 'MILISECOND_TIME', 'PLURAL', word], this.translate.translations[this.translate.currentLang]) + ' ' + ago;
          } else {
            return counter + ' ' + UtilTranslate(['PIPE', 'MILISECOND_TIME', 'SINGULAR', word], this.translate.translations[this.translate.currentLang]) + ' ' + ago;
          }

          break;
      }
      
    }
  }

}
