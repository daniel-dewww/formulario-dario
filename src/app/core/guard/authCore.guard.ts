import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, CanActivateChild, CanActivate, CanLoad, Route } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import * as Cookie from '../../util/cookies/cookies';
import { CourrentUser, Masterdowload, RequestMasterdowload } from 'src/app/class/masterdowload';
import { CoreObservableService } from '../service/core-observable.service';
import { isEmpty } from 'src/app/util/utilCopyWithoutReference';
// import { Menu } from '../menu/menu.service';
import { cloneDeep } from 'lodash';
import { Console } from 'console';

@Injectable({
    providedIn: 'root'
})
export class AuthCoreGuard implements CanActivate, OnDestroy {

    //suscription
    coreObservableSuscription?: Subscription;

    dataMaestra: Masterdowload = new Masterdowload();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private _coreObservableService: CoreObservableService,
    ) {

        // this.coreObservableSuscription = this._coreObservableService.masterdownload$
        //     .subscribe((dataMaster: Masterdowload) => {
        //         this.dataMaestra = dataMaster;
        //     });
    }

    ngOnDestroy() {
        // this.coreObservableSuscription.unsubscribe();
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        debugger
        let jsonUser: CourrentUser = (Cookie.getCookie(Cookie.userCookieName).length > 0) ? JSON.parse(Cookie.getCookie(Cookie.userCookieName)) : undefined;
        if (jsonUser && isEmpty(this._coreObservableService._masterdownload.value)) {
            let requestMasterdowload: RequestMasterdowload = new RequestMasterdowload();
            requestMasterdowload.activo = 1;
            requestMasterdowload.user_uuid = jsonUser.user_uuid;
            requestMasterdowload.companyId = jsonUser.companyId;
            await this._coreObservableService.serviceMasterDowload(requestMasterdowload)
            // console.log(this._coreObservableService._masterdownload.value.menus);
            // return this.validateAcceses(state.url, cloneDeep(this._coreObservableService._masterdownload.value.menus!));
        }
     
         return this.validateAcceses(state.url, cloneDeep(this._coreObservableService._masterdownload.value.menus!));
    }

    validateAcceses(urlSearch: string, menu: any[]): boolean {
        var rutas: string[] = urlSearch.split('/');
        let validate: boolean = false;
        if (rutas.length > 2) {
            if (menu && menu.length > 0) {
                menu.forEach(menu => {
                    if (menu.state == rutas[2]) {
                        if (menu.children) {
                            menu.children.forEach(children => {
                                if (children.state == rutas[3]) {
                                    validate = true;
                                }
                            });
                        } else {
                            validate = true
                        }
                    }
                });
            }
        }

        if (!validate && menu && menu.length > 0) {
            if (menu[0].children && menu[0].children.length > 0) {
                this.router.navigate(['../core/' + menu[0].state + '/' + menu[0].children[0].state]);
            } else {
                this.router.navigate(['../core/' + menu[0].state]);
            }
        }

        return validate;
    }

    // canActivateChild() {
    //     // let user: CourrentUser = JSON.parse(localStorage.getItem('currentUser_Price'));
    //     
    //     return true;
    // }

    // canActivate(
    //     next: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //     let user: CourrentUser = JSON.parse(localStorage.getItem('currentUser_Price'));
    //     if (user != undefined) {
    //         return true;
    //     } else {
    //         this.router.navigate(['/']);
    //         return true;
    //     }
    // }

    // canActivateChild(
    //     route: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot): boolean {
    //     let user: CourrentUser = JSON.parse(localStorage.getItem('currentUser_Price'));
    //     if (user != undefined) {
    //         return true;
    //     } else {
    //         this.router.navigate(['/']);
    //         return false;
    //     }
    // }

    // validarUsuario(url: string): boolean {

    //     let jsonUser: CourrentUser = (Cookie.getCookie(Cookie.userCookieName).length > 0) ? JSON.parse(Cookie.getCookie(Cookie.userCookieName)) : undefined;
    
    //     console.log(JSON.stringify(this.adminLayout.dataMaestra))

    //     let band = false;
    //     if (jsonUser != undefined) {

    //         //   switch (user.Rol) {

    //         //     case environment.ROL.ADMIN:

    //         //       if (url === '/default' || url === '/default/empresa' || url === '/default/solicitar-servicio' || url === '/default/metodo-pago' || url === '/default/reporte-aprobacion' || url == 'default/configuracion-parametros') {
    //         //         this.router.navigate(['/default/usuarios']);
    //         //         band = false;
    //         //       } else {
    //         //         band = true;
    //         //       }
    //         //       break;
    //         //   }
    //     } else {
    //         // this.router.navigate(['/']);
    //     }
    //     return band;
    // }
}
