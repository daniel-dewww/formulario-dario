import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavPhills } from '../utils/interfaces';

@Component({
  selector: 'nexus-ng-nav',
  templateUrl: './ng-nav.component.html',
  styleUrls: ['./ng-nav.component.scss']
})
export class NgNavComponent implements OnInit {
  active: any;
  disabled: boolean = true;
  activateRoute!: string;

  @Input() listaTabs: NavPhills[] = [];
  
  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.onNavChange(this.router.url);
  }

  
  onNavChange(url:string) {
    var rutas: string[] = url.split('/');

    if(rutas[rutas.length - 1].split('?')){
      this.activateRoute = rutas[rutas.length - 1].split('?')[0];
    } else {
      this.activateRoute = rutas[rutas.length - 1];
    }

  }
  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.active = 1;
    }
  }
}
