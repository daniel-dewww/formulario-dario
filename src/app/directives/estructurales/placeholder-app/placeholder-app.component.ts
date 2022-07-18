import { HostListener, SimpleChanges } from '@angular/core';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { fnStyleHeightWidth } from 'src/app/util/utilStyles';
import { fnValidateViewExist } from 'src/app/util/utilValidate';

@Component({
  selector: 'nexus-placeholder-app',
  templateUrl: './placeholder-app.component.html',
  styleUrls: ['./placeholder-app.component.scss']
})
export class PlaceholderAppComponent implements OnInit {

  @Input() idName: string = '';

  constructor(
    private ref: ChangeDetectorRef
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize() {
      this.cambiarStilo();
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
    if(panel){
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
