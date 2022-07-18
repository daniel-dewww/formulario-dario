import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  //selector: '[appDnd]'
  selector: '[nexusUploadFileDragAndDrop]'
})
export class UploadFileDragAndDropDirective {
  @HostBinding('class.fileover') fileOver?: boolean;
  // @Input() disabled: boolean = false;

  @Input() disabled: boolean = false;
  @Output() fileDropped = new EventEmitter<any>();

  constructor() { }

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    if(!this.disabled){
      evt.preventDefault();
      evt.stopPropagation();
      this.fileOver = true;
    }
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    if(!this.disabled){
      evt.preventDefault();
      evt.stopPropagation();
      this.fileOver = false;
    }
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt: any) {
    if(!this.disabled){
      evt.preventDefault();
      evt.stopPropagation();
      this.fileOver = false;
      let files = evt.dataTransfer.files;
      if (files.length > 0) {
        this.fileDropped.emit(files);
      }
    }
  }
}

