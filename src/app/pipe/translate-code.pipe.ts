import { Pipe, PipeTransform, ɵConsole } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilTranslate } from '../util/utilTranslate';

@Pipe({
  name: 'translateCode'
})
export class TranslateCodePipe implements PipeTransform {

  lang: string;
  constructor(
    public translate: TranslateService
  ) {
    this.lang = translate.currentLang;
  }

  transform(value: string | number | undefined, lang?: string, type?: string, name?: string): string {
    // this.lang = lang ? lang : this.translate.currentLang;
    let traslateWord!: string;
    if (value != undefined && value != null && type) {
      traslateWord = this.returnTraducctionOfIntervals(value, type);
    }

    if (traslateWord && traslateWord.length > 0) {
      return traslateWord;
    } else {
      return name = (name) ? name : ''
    }
  }

  returnTraducctionOfIntervals(id: string | number, type: string): string {
    switch (type) {
      case 'TRANSLATE_CODE':
        return this.traslateTypeWord(id, type);
        break;
      case 'DOCUMENT_TYPES':
        return this.traslateTypeWord(id, type);
        break;
      case 'GENDERS':
        return this.traslateTypeWord(id, type);
        break;
      case 'MODE_RESERVE':
        return this.traslateTypeWord(id, type);
        break;
      case 'PAYMENT_TYPES':
        return this.traslateTypeWord(id, type);
        break;
      case 'SERVICE_TYPES':
        return this.traslateTypeWord(id, type);
        break;
      case 'STATUS_TYPES_DRIVER':
        return this.traslateTypeWord(id, type);
        break;
      case 'STATUS_TYPES_SERVICE':
        return this.traslateTypeWord(id, type);
        break;
      case 'TURNS':
        return this.traslateTypeWord(id, type);
        break;
      case 'TYPE_RECEIPTS':
        return this.traslateTypeWord(id, type);
        break;
      case 'TYPE_ZONE':
        return this.traslateTypeWord(id, type);
        break;
      case 'VEHICLE_TYPES':
        return this.traslateTypeWord(id, type);
        break;
      case 'CATEGORY_TYPE':
        return this.traslateTypeWord(id, type);
        break;
      case 'ATRIBUTTES_VEHICLE':
        return this.traslateTypeWord(id, type);
        break;
      case 'DOCUMENT_STATUS':
        return this.traslateTypeWord(id, type);
        break;
      case 'DOCUMENT_STATUS_COMMENT':
        return this.traslateTypeWord(id, type);
        break;
      case 'DRIVER_DOCUMENTS':
        return this.traslateTypeWord(id, type);
        break;
      case 'VEHICLE_DOCUMENTS':
        return this.traslateTypeWord(id, type);
        break;
      case 'STATUS_TYPE_DRIVER':
        return this.traslateTypeWord(id, type);
        break;
      case 'STATUS_TYPE_SERVICE_GROUP':
        return this.traslateTypeWord(id, type);
        break;
      case 'TEMPLATE_PERMISSION':
        return this.traslateTypeWord(id, type);
        break;
      case 'TEMPLATE_PERMISSION_SCREEN':
        return this.traslateTypeWord(id, type);
        break;
      case 'TEMPLATE_PERMISSION_SCREEN_CHILDREN':
        return this.traslateTypeWord(id, type);
        break;
      case 'MODALITY_NAME':
        return this.traslateTypeWord(id, type);
        break;
      case 'MODALITY_DESCRIPTION':
        return this.traslateTypeWord(id, type);
        break;
      case 'DYNAMIC_FIELDS':
        return this.traslateTypeWord(id, type);
        break;
      case 'TYPE_CONTROL':
        return this.traslateTypeWord(id, type);
        break
      default:
        return '';
        break;
    }
  }

  traslateTypeWord(id: string | number, type: string) {
    return UtilTranslate(['PIPE', 'TRANSLATE_CODE', type, id + ''], this.translate.translations[this.lang]);
  }
}

