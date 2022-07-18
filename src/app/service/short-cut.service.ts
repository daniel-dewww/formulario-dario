import { Injectable } from '@angular/core';
import { Type_Shortcut } from 'src/app/class/class-directive/enunShortCutService';
import { ActivedSuscription, SC_ShortCutService, NG_ShortCut, ShortCut, PrioritySuscription } from 'src/app/class/class-directive/shortCutService';
import { Id_Screen } from 'src/app/class/typesKeyword';
import { fnDateToUnixTime } from 'src/app/util/utilDate';
import { InitAllShortCut } from '../util/admin-layout-util';

@Injectable({
  providedIn: 'root'
})
export class ShortCutService implements SC_ShortCutService {

  keys: ActivedSuscription[] = [];
  private lstShortCut: ShortCut[] = InitAllShortCut();
  positionScreen: PrioritySuscription[] = [];

  constructor() { }

  async suscribeShortCut(ng_shortCut: NG_ShortCut): Promise<ActivedSuscription> {
    let promisePromise: Promise<ActivedSuscription> = new Promise<ActivedSuscription>(
      (resolve, reject) => {
        try {
          let suscrip: ActivedSuscription = new ActivedSuscription();
          suscrip.id = ((fnDateToUnixTime(new Date()) + this.keys.length) * Math.random()) + ((fnDateToUnixTime(new Date()) + this.keys.length) * Math.random())
          suscrip.suscription = ng_shortCut;

          this.keys.push(suscrip);
          this.orderPositionScreem(ng_shortCut.keysInternalId, suscrip.id)

          resolve(suscrip);
        }
        catch (error) {
          reject(error)
        }
      });

    return promisePromise;
  }

  ususcribeShortCut(idSuscription: number) {
    if (this.keys && idSuscription != undefined && idSuscription != null && idSuscription != NaN) {
      let indexSuscrip = this.keys.findIndex(suscrip => suscrip.id == idSuscription);
      this.keys.splice(indexSuscrip, 1);

      this.deletePositionScreem(idSuscription);

    }
  };

  ngKeyboardShortcuts(key: string) {
    // console.log('  ngKeyboardShortcuts  ',key);
    let objShortCutsInternal: ShortCut[] = this.orderArrayPriority(key);
    let objShortCutsGlobal: ShortCut[] = this.lstShortCut.filter(sc => sc.value == key && sc.typeShortCut == Type_Shortcut.KEY_GLOBAL);

    // console.log(objShortCutsInternal);
    if (objShortCutsInternal && objShortCutsInternal.length > 0) {
      objShortCutsInternal.forEach(internal => {
        this.findSuscription(internal);
      });
    } else {
      objShortCutsGlobal.forEach(global => {
        this.findSuscription(global);
      });
    }
  }

  private findSuscription(valueInternal: ShortCut) {
    this.keys.forEach(activate => {
      let objKey: ShortCut[] = activate.suscription?.lstshortCut.filter(suscrip => suscrip.value == valueInternal.value && suscrip.idkey == valueInternal.idkey && suscrip.idScreem == valueInternal.idScreem && suscrip.idcomponent == valueInternal.idcomponent)!;
      if (objKey && objKey.length > 0) {
        objKey.forEach(keySC => {
          if(activate && activate.suscription && keySC){
            activate.suscription.keyCode(keySC);
          }
        });
      }
    });
  }

  private orderArrayPriority(key: string): ShortCut[] {
    let objShortCutsInternal: ShortCut[] = this.lstShortCut.filter(sc => sc.value == key && sc.typeShortCut == Type_Shortcut.KEY_INTERNAL);
    let objOrdenShortCut: ShortCut[] = [];

    this.positionScreen.forEach(posi => {
      objShortCutsInternal.forEach(objSc => {
        if(posi.idScreem == objSc.idScreem && objOrdenShortCut.length == 0){
          objOrdenShortCut.push(objSc);
        }
      });
    });

    return objOrdenShortCut;
  }

  private orderArray(arrayToOrder: ShortCut[]): ShortCut[] {
    arrayToOrder.sort(function (a, b) {
      if (a.typeShortCut == Type_Shortcut.KEY_INTERNAL) {
        return 1;
      }
      if (b.typeShortCut == Type_Shortcut.KEY_GLOBAL) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    return arrayToOrder;
  }

  private orderPositionScreem(idScreem: Id_Screen, idActivation: number) {
    this.positionScreen.splice(0, 0, { idActivation: idActivation, idScreem: idScreem });
  }

  private deletePositionScreem(idActivation: number) {
    let indexPoositionActi = this.positionScreen.findIndex(positionS => positionS.idActivation == idActivation);
    if (indexPoositionActi > -1) {
      this.positionScreen.splice(indexPoositionActi, 1);
    }
  }

}
