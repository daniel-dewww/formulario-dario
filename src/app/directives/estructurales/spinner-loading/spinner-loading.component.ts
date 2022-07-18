import { Component, OnInit, HostListener, Input, OnChanges, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { fnStyleHeightWidth } from 'src/app/util/utilStyles';
import { fnValidateViewExist } from 'src/app/util/utilValidate';

@Component({
  selector: 'nexus-spinner-loading',
  templateUrl: './spinner-loading.component.html',
  styleUrls: ['./spinner-loading.component.scss']
})
export class SpinnerLoadingComponent implements OnInit, OnChanges {

  @Input() idName: string = '';
  @Input() showSpinner: boolean = true

  constructor(
    private ref: ChangeDetectorRef
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.showSpinner) {
      this.cambiarStilo();
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
      this.cambiarStilo();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.showSpiner && changes.showSpiner.currentValue) {
      this.cambiarStilo();
    }
  }

  cambiarStilo(): any {
    var panel = document.getElementById(this.idName);

    if(panel && this.showSpinner){
      return fnStyleHeightWidth(panel.clientHeight, panel.clientWidth)
    } else {
      return fnStyleHeightWidth(50, 50)
    }
  }

  actualizarVista() {
    if (fnValidateViewExist(this.ref)) {
      this.ref.detectChanges();
    }
  }
}
