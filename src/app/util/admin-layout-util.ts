import { cloneDeep } from "lodash";
import { Type_Shortcut } from "src/app/class/class-directive/enunShortCutService";
import { SC_Key, SC_ShortCut_Json, ShortCut } from "src/app/class/class-directive/shortCutService";
import { Id_Component, Id_Screen } from "src/app/class/typesKeyword";
import { environment } from "src/environments/environment";

export function InitAllShortCut(): ShortCut[]{
    let shortCutJson: SC_ShortCut_Json = environment.SHORT_CUT as SC_ShortCut_Json;
    let lstShortCut: ShortCut[] = [];
    
    lstShortCut  = cloneDeep(convertKeyToShorcutGlobal(shortCutJson.keysGlobal!))
    
    shortCutJson.keysInternal?.forEach(screen => {
        let lstShortCutScreen: ShortCut[] = convertKeyToShorcutInternal(screen.keys!, screen.id);
        lstShortCutScreen.forEach(shortcut => {
            lstShortCut.push(shortcut);
        });
        if(screen.components){
            screen.components.forEach(component => {
                let lstShortCutComponent: ShortCut[] = convertKeyToShorcutInternal(component.keys!, screen.id, component.id);
                lstShortCutComponent.forEach(shortcut => {
                    lstShortCut.push(shortcut);
                });
            });
        }
    });

    return lstShortCut;
}

export function convertKeyToShorcutGlobal(lstKeys: SC_Key[]): ShortCut[] {
    let lstShortCut: ShortCut[] = [];
    lstKeys.forEach(key => {
        let shortCut: ShortCut = new ShortCut();
        shortCut.idkey = key.id;
        shortCut.typeShortCut = Type_Shortcut.KEY_GLOBAL;
        shortCut.value = key.value;
        shortCut.description = key.description;

        lstShortCut.push(shortCut);
    });

    return lstShortCut;
}

export function ShortCutInternal(shortCutJson:SC_ShortCut_Json ,idScreen: Id_Screen, idComponent?: Id_Component): ShortCut[] {
    if (shortCutJson && idScreen) {
        let objScreen = shortCutJson.keysInternal?.find(screen => (screen.id == idScreen));
        if (objScreen) {
            if (idComponent && idComponent != undefined) {
                let objComponent = objScreen.components?.find(screen => (screen.id == idComponent));
                if(objComponent){                    
                    return convertKeyToShorcutInternal(objComponent.keys!, idScreen, idComponent);
                }
            }
            return convertKeyToShorcutInternal(objScreen.keys!, idScreen);
        }
    }
    return [];
}

export function convertKeyToShorcutInternal(lstKeys: SC_Key[], idScreen?: Id_Screen, idComponent?: Id_Component): ShortCut[] {
    let lstShortCut: ShortCut[] = [];
    lstKeys.forEach(key => {
        let shortCut: ShortCut = new ShortCut();
        shortCut.idkey = key.id;
        shortCut.typeShortCut = Type_Shortcut.KEY_INTERNAL;
        shortCut.value = key.value;
        shortCut.description = key.description;
        shortCut.idScreem = (idScreen) ? idScreen : undefined;
        shortCut.idcomponent = (idComponent) ? idComponent : undefined;
        shortCut.idcomponent = (idComponent) ? idComponent : undefined;

        lstShortCut.push(shortCut);
    });

    return lstShortCut;
}
