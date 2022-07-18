import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';
import { ToastButton, ButtonToast, TypeButton, ButtonToastTypeFunction, ButtonToastTypeService } from 'src/app/class/class-directive/toastClass';
import { fnColorBasedBrightnessBlackOrWhite, fnColorBasedBrightness } from 'src/app/util/utilStyles';
import { ServiceStructService } from 'src/app/util/serviceService/service-struct.service';

@Component({
  selector: '[pink-toast-component]',
  styleUrls: ['./toast-button.component.css'],
  templateUrl: './toast-button.component.html',
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        opacity: 0,
      })),
      transition('inactive => active', animate('400ms ease-out', keyframes([
        style({
          transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
          opacity: 0,
        }),
        style({
          transform: 'skewX(20deg)',
          opacity: 1,
        }),
        style({
          transform: 'skewX(-5deg)',
          opacity: 1,
        }),
        style({
          transform: 'none',
          opacity: 1,
        }),
      ]))),
      transition('active => removed', animate('400ms ease-out', keyframes([
        style({
          opacity: 1,
        }),
        style({
          transform: 'translate3d(100%, 0, 0) skewX(30deg)',
          opacity: 0,
        }),
      ]))),
    ]),
  ],
  preserveWhitespaces: false,
})
export class ToastButtonComponent extends Toast {

  /** Variable for color to backgroud of toast */
  cssBackground: string = '--variable-toast-button';
  /** Variable for color label */
  cssBackgroundPrimary: string = '--contraste-Empresa';

  /** Data an corfiguraton for service to this component */
  @Input() toastButton: ToastButton = new ToastButton();

  /** Output, when this function is finish
   * 
   */
  @Output() clickBtnToast: EventEmitter<any> = new EventEmitter<any>();

  /** Show spinner */
  showSpinner?: boolean;

  /** Disabled button */
  disabledBtn?: boolean;

  colorBackground = getComputedStyle(document.documentElement).getPropertyValue(this.cssBackground)
  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage,
    private serviceComponent: ServiceStructService,
  ) {
    super(toastrService, toastPackage);
  }

  fnStyleBasedBrightness(): string {
    return fnColorBasedBrightness(getComputedStyle(document.documentElement).getPropertyValue(this.cssBackground));
  }

  fnStyleBasedBrightnessPrimaryColor(): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(this.cssBackgroundPrimary);
  }

  /** Event click in buton toast */
  async btnToast(buttonToast: ButtonToast) {
    switch (buttonToast.typeButton) {
      case TypeButton.SERVICE:
        await this.btnTypeService(buttonToast.buttonToastTypeService as ButtonToastTypeService);
        break;
      case TypeButton.FUNCTION:
        if(buttonToast.buttonToastTypeFunction && buttonToast.buttonToastTypeFunction.parameter){
          buttonToast.buttonToastTypeFunction.funcButton(buttonToast.buttonToastTypeFunction.parameter);
        } else {
          buttonToast.buttonToastTypeFunction?.funcButton();
        }
        break;
      default:
        break;
    }

  }

  async btnTypeService(buttonToastType: ButtonToastTypeService) {
    if (buttonToastType.structService && buttonToastType.routeService) {
      this.disabledBtn = true;
      this.showSpinner = true;
      let response: any = await this.serviceComponent.requestService(buttonToastType.structService, buttonToastType.routeService, buttonToastType.json)
      this.showSpinner = false;
      this.disabledBtn = false;
    }
  }

  /** Event click  for button close(cross X) */
  closeToast() {
    this.toastrService.clear();
  }


}
