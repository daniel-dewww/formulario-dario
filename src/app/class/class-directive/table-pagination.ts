import { TemplateRef } from '@angular/core';

/**
 * this.hedears = [
  *    {id:1,name:'IdViaje', value: ["idViaje"],type:TypePersonalizationTableEdition.TEMPLATE,personalization: fnInitPersonalizationTableEdition(true,TypePersonalizationTableEdition.TEMPLATE,undefined, undefined,this.defaultTabButtonsTpl)},
  *    {id:2,name:'prueba', value: ["prueba"],type:TypePersonalizationTableEdition.ICON_CLASS,personalization: fnInitPersonalizationTableEdition(true,TypePersonalizationTableEdition.ICON_CLASS, "#966666", ['icon','icon-basic-calendar']) },
  *    {id:3,name:'Nro viaje', value: ["viaje"], personalization: fnInitPersonalizationTableEdition(true,TypePersonalizationTableEdition.TEXT) },
  *    {id:4,name:'Conductor', value: ["idConductor"], type:TypePersonalizationTableEdition.BOX_COLOR,personalization: fnInitPersonalizationTableEdition(true,TypePersonalizationTableEdition.BOX_COLOR, '#654895') },
  * ]
 */
export class TableHeader {
    id?: number | string;
    name?: string;
    value?: any;
    type?: TypePersonalizationTableEdition;
    personalization?: TableEdition
}

export class TableEdition {
    // value?: string;
    color?: string;
    classPersonalization?: string[];
    template?: TemplateRef<any>;
    flagClick?: boolean;
}

export enum TypePersonalizationTableEdition {
    TEXT = "TEXT",
    BOX_COLOR = "COLOR",
    ICON_PATH = "ICON_PATH",
    ICON_CLASS = "ICON_CLASS",
    TEMPLATE = "TEMPLATE"
}

export function fnInitPersonalizationTableEdition(
    flagClick: boolean,
    type?: TypePersonalizationTableEdition,
    color?: string,
    // value?: string,
    classPersonalization?: string[],
    template?: TemplateRef<any>,
) {
    let personalization: TableEdition = new TableEdition();
    personalization.color = color;
    personalization.classPersonalization = classPersonalization;
    personalization.template = template;
    personalization.flagClick = flagClick;

    try {
        if (type) {
            switch (type) {
                case TypePersonalizationTableEdition.BOX_COLOR:
                    if (!personalization.color) {
                        throw "Your type table, need a value";
                    }
                    break;

                // case TypePersonalizationTableEdition.ICON_PATH:
                //     if (!personalization.path) {
                //         throw "Your type table, need path";
                //     }
                //     break;

                case TypePersonalizationTableEdition.ICON_CLASS:
                    if (!personalization.color) {
                        throw "Your type table, need color";
                    }
                    break;

                case TypePersonalizationTableEdition.TEMPLATE:
                    if (!personalization.template) {
                        throw "Your type table, need a template";
                    }
                    break;
            }
        } else {
            throw "Your need type table";
        }
    } catch (e) {
        throw e;
    }
    return personalization;
}

export class ClickTable {
    valueHeader?: number | string;
    valueBody?: any;
}