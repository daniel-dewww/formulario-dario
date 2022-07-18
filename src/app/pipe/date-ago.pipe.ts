import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilTranslate } from '../util/utilTranslate';
import { Languaje } from '../class/enum/enumEstados';

@Pipe({
    name: 'dateAgo',
    pure: true
})


export class DateAgoPipe implements PipeTransform {

    lang: string;
    constructor(
        public translate: TranslateService
    ) {
        this.lang = translate.currentLang;
     }

     transform(value: any, lang: string,): any {
        if (value) {
            const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
            if (seconds < 29) {// less than 30 seconds ago will show as 'Just now'
                return this.returnTraducctionOfIntervals('just_now');
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
                        return this.returnTraducctionOfIntervals(i,counter,false); // singular (1 day ago)
                    } else {
                        return this.returnTraducctionOfIntervals(i,counter,true); // plural (2 days ago)
                    }
            }
        }
        return value;
    }


    returnTraducctionOfIntervals(word: string, counter?:number, plurals?: boolean): string {
        switch (word) {
            case 'just_now':
                return UtilTranslate(['PIPE', 'DATE_AGO', 'JUST_NOW'], this.translate.translations[this.translate.currentLang]);
                break;
            case 'YEAR':
                return this.singularPluralsWordTraslate(counter!, word, plurals!);
                break;
            case 'MONTH':
                return this.singularPluralsWordTraslate(counter!, word, plurals!);
                break;
            case 'WEEK':
                return this.singularPluralsWordTraslate(counter!, word, plurals!);
                break;
            case 'DAY':
                return this.singularPluralsWordTraslate(counter!, word, plurals!);
                break;
            case 'HOUR':
                return this.singularPluralsWordTraslate(counter!, word, plurals!);
                break;
            case 'MINUTE':
                return this.singularPluralsWordTraslate(counter!, word, plurals!);
                break;
            case 'SECOND':
                return this.singularPluralsWordTraslate(counter!, word, plurals!);
                break;
            default:
                return '';
                break;
        }
    }

    singularPluralsWordTraslate(counter:number, word: string, plurals: boolean): string {        
        let ago: string = UtilTranslate(['PIPE', 'DATE_AGO', 'AGO'], this.translate.translations[this.translate.currentLang]);
        if(this.translate.currentLang == Languaje.ES){
            if (plurals) {
                return ago + ' ' + counter + ' ' + UtilTranslate(['PIPE', 'DATE_AGO', 'PLURAL', word], this.translate.translations[this.translate.currentLang]);
            } else {
                return ago + ' ' + counter + ' ' + UtilTranslate(['PIPE', 'DATE_AGO', 'SINGULAR', word], this.translate.translations[this.translate.currentLang]);
            }
        } else{
            if (plurals) {
                return counter + ' ' + UtilTranslate(['PIPE', 'DATE_AGO', 'PLURAL', word], this.translate.translations[this.translate.currentLang]) +  ' ' + ago;
            } else {
                return counter + ' ' + UtilTranslate(['PIPE', 'DATE_AGO', 'SINGULAR', word], this.translate.translations[this.translate.currentLang]) +  ' ' + ago;
            }
        }
    }
}