import { Input } from "@angular/core";
import { AllowIn } from "ng-keyboard-shortcuts";
import { Id_Component, Id_Key, Id_Screen } from "../typesKeyword";
import { ID_Screen, Type_Shortcut } from "./enunShortCutService";

export class SC_Key {
    id?: Id_Key;
    value?: string;
    shortCut?: string;
    description?: string;
    allowIn?: AllowIn[]; 
}

export class SC_Component {
    id?: Id_Component;
    description?: string
    keys?: SC_Key[];
}

export class SC_Screen {
    id?: Id_Screen;
    description?: string
    keys?: SC_Key[];
    components?: SC_Component[];
}

export class SC_ShortCut_Json {
    /** This content Keys, all Globals*/
    keysGlobal?: SC_Key[]
    /** This content keys for Screen*/
    keysInternal?: SC_Screen[]
}

/** Structure components to suscription in a estructure*/
export class ActivedSuscription {
    id?: number;
    suscription?: NG_ShortCut;
}

/** Structure components to priority position in sucription shortCut*/
export class PrioritySuscription {
    idActivation?: number;
    idScreem?: Id_Screen;
}

/** Components when susciptions in Interface */
export class ShortCut {
    typeShortCut?: Type_Shortcut;
    idkey?: Id_Key;
    value?: string;
    description?: string;
    idScreem?: Id_Screen;
    idcomponent?: Id_Component;
}


export interface SC_ShortCutService {

    /** List of all keys suscriptions activate in components*/
    keys: ActivedSuscription[];

    /** Put priority for the screen to view */
    positionScreen: PrioritySuscription[];

    /** You can generate the suscription*/
    suscribeShortCut(ng_shortCut: NG_ShortCut): Promise<ActivedSuscription>

    /** you can unsuscribe if send id of actived suscription*/
    ususcribeShortCut(idSuscription: number): any;
}

/** Estructure for component to need suscribe in a ShortCut*/
export interface NG_ShortCut {

    lstshortCut: ShortCut[];
    keysInternalId: ID_Screen;
    /** Send information in this function all suscriptions*/
    keyCode(key: ShortCut): any
}
