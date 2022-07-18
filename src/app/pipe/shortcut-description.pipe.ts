import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SC_Key, SC_ShortCut_Json, ShortCut } from '../class/class-directive/shortCutService';
import { Id_Component, Id_Screen } from '../class/typesKeyword';
import { convertKeyToShorcutInternal } from '../core/admin-layout/admin-layout-util';

@Pipe({
  name: 'shortcutDescription'
})
export class ShortcutDescriptionPipe implements PipeTransform {

  shortCutJson: SC_ShortCut_Json = environment.SHORT_CUT.keysInternal as SC_ShortCut_Json;
  lstShortCut: ShortCut[] = [];

  transform(keyVal: string, idScreen: Id_Screen, idComponent?: Id_Component): string {

    let objScreen = this.shortCutJson.keysInternal?.find(screen => (screen.id == idScreen));
    if (objScreen) {
      if (idComponent && idComponent != undefined) {
        let objComponent = objScreen.components?.find(screen => (screen.id == idComponent));
        if (objComponent) {
          return this.shortCurDetail(keyVal, objComponent.keys!);
        }
      }
      return this.shortCurDetail(keyVal, (objScreen.keys) ? objScreen.keys : []);
    }

    return '';
  }

  shortCurDetail(keyVal: string, objKey: SC_Key[]): string {
    let lstShortCut: ShortCut[] = [];

    let objKeyVal = lstShortCut.find(key => (key.description == keyVal));
    if (objKeyVal) {
      return objKeyVal.description!
    }
    return '';
  }

}
