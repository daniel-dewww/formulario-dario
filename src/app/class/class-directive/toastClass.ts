import { StructService, RouteService } from 'src/app/util/serviceService/serviceStruct';

export class ToastButton {
  title?: string;
  message?: string;
  flagNotCloseToastClick?: boolean;
  flagCloseButton?: boolean;
  flagProgressBar?: boolean;
  flagButtom?: boolean;
  buttonToast?: ButtonToast;
}


export class ButtonToast {
  textButton?: string;
  typeButton: TypeButton;

  buttonToastTypeService?: ButtonToastTypeService;
  buttonToastTypeFunction?: ButtonToastTypeFunction;

  constructor(typeButton: TypeButton){
    this.typeButton = typeButton;
  }
}

export function fnInitToastButtonClass(
  message: string,
  title?: string,
  buttonToast?: ButtonToast,
  flagNotCloseToastClick?: boolean,
  flagCloseButton?: boolean,
  flagProgressBar?: boolean,
): ToastButton {

  let toastButton: ToastButton = new ToastButton();
  toastButton.title = title;
  toastButton.message = message;
  toastButton.flagNotCloseToastClick = flagNotCloseToastClick;
  toastButton.flagCloseButton = flagCloseButton;
  toastButton.flagProgressBar = flagProgressBar;


  if (buttonToast) {
    toastButton.flagButtom = true;
    toastButton.buttonToast = buttonToast;

    try {
     if(buttonToast.typeButton){
      switch (buttonToast.typeButton) {
        case TypeButton.SERVICE:
          if (!buttonToast.buttonToastTypeService) {
            throw "Your type button is service and tha object for especific type is null: buttonToastTypeService";
          }
          break;

        case TypeButton.FUNCTION:
          if (!buttonToast.buttonToastTypeFunction) {
            throw "Your type button is Function and tha object for especific type is null: buttonToastTypeFunction";
          }
          break;
      }
      toastButton.buttonToast = buttonToast;
     } else{
      throw "You need especific typeButton";
     }
    } catch (e) {
      throw e;
    }

  }


  return toastButton;
}

/** solo si el tipo de boton llega al servicio*/
export class ButtonToastTypeService {
  structService: StructService;
  routeService: RouteService;
  json: any
  constructor(
    structService: StructService,
    routeService: RouteService,
    json?: any
    ){      
    this.structService = structService;
    this.routeService = routeService;
    this.json = (json)? json : undefined;
    }
}

/** solo si el tipo de boton se mantiene en el front */
export class ButtonToastTypeFunction {
  funcButton: Function 
  parameter: any 
  constructor(
    funcButton: Function,
    parameter?: any
    ){      
    this.funcButton = funcButton;
    this.parameter = parameter;
    }
}

export enum TypeButton {
  SERVICE = 'SERVICE',
  FUNCTION = 'FUNCTION'
}


