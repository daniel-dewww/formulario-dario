import { Injectable } from '@angular/core';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { cloneDeep } from 'lodash';
import { ToastButtonComponent } from 'src/app/directives/estructurales/toast-button/toast-button.component';
import { ToastButton} from 'src/app/class/class-directive/toastClass';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  options: GlobalConfig;
  private lastInserted: number[] = [];
  
  constructor(private toastrService: ToastrService) {
    this.options = this.toastrService.toastrConfig;
  }

  showSuccess(message: string, title?: string) {
    const inserted = this.toastrService.success(message, title);

    if (inserted && inserted.toastId) {
      this.lastInserted.push(inserted.toastId);
    }
    return inserted;
  }

  showInfo(message: string, title?: string) {
    const inserted = this.toastrService.info(message, title);

    if (inserted && inserted.toastId) {
      this.lastInserted.push(inserted.toastId);
    }
    return inserted;
  }

  showError(message: string, title?: string) {
    const inserted = this.toastrService.error(message, title);

    if (inserted && inserted.toastId) {
      this.lastInserted.push(inserted.toastId);
    }
    return inserted;
  }

  showWarning(message: string, title?: string) {
    const inserted = this.toastrService.warning(message, title);

    if (inserted && inserted.toastId) {
      this.lastInserted.push(inserted.toastId);
    }
    return inserted;
  }

  clearToasts() {
    this.toastrService.clear();
  }

  clearLastToast() {
    this.toastrService.clear(this.lastInserted.pop());
  }

  openButtonToast(toastButton?: ToastButton) {
    const opt = cloneDeep(this.options);;
    if(!toastButton?.flagProgressBar){
      opt.disableTimeOut = true;
    }         
    opt.toastComponent = ToastButtonComponent;
    if(toastButton?.flagNotCloseToastClick){
      opt.tapToDismiss = false;
    }         
    
    const inserted = this.toastrService.show(toastButton?.message, toastButton?.title, opt);
    inserted.toastRef.componentInstance.toastButton = toastButton

    // if (inserted && inserted.toastId) {
    //   this.lastInserted.push(inserted.toastId);
    // };

    // return inserted;
  }

}
