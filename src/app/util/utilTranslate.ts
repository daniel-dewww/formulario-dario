import { IfStmt } from '@angular/compiler';

export function UtilTranslate(name: string[], jsonTranslate: Object): string {
    let translate = JSON.parse(JSON.stringify(jsonTranslate));
    // let translate = json.translations;
   let index: number = 0
    name.forEach(element => {
        if(translate[element]){
            translate = translate[element];
            element
            index ++;
        }
    });
    translate = translate ? translate : '';

    if(index == name.length){
        return translate;
    } else {
        return '';
    }
}