import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from "@angular/router";
import { Injectable } from "@angular/core";
import * as Cookie from 'src/app/util/cookies/cookies';
import { CoreObservableService } from '../service/core-observable.service';
import { RequestMasterdowload, CourrentUser } from 'src/app/class/masterdowload';
// import { WebSocketConfiguration } from "../service/web-socketStomp.service";

@Injectable()
export class MaestrosResolve implements Resolve<any> {

    constructor(
        private router: Router,
        private route: ActivatedRoute,     
        private _coreObservableService: CoreObservableService,        
    ) {
    }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = Cookie.getCookie(Cookie.userCookieName).toString();
        let jsonUser: CourrentUser = (user.length > 0) ? JSON.parse(user): undefined;

        if (jsonUser) { 
            let requestMasterdowload: RequestMasterdowload = new RequestMasterdowload();
            requestMasterdowload.activo = 1;
            requestMasterdowload.user_uuid = jsonUser.user_uuid;
            requestMasterdowload.companyId = jsonUser.companyId;
            requestMasterdowload.anexo = jsonUser.anexo;
            return await this._coreObservableService.serviceMasterDowload(requestMasterdowload)
        } else {   
            this.router.navigate(['../../authentication'], { relativeTo: this.route });    
            return undefined 
        }
    }

    // resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<Masterdowload> {
    //     const user = Cookie.getCookie(Cookie.userCookieName);
    //     let jsonUser: CourrentUser = (user.length > 0) ? JSON.parse(user): undefined;
    //     if (jsonUser) { 
    //         let requestMasterdowload: RequestMasterdowload = new RequestMasterdowload();
    //         requestMasterdowload.activo = 1;
    //         return this._coreObservableService.serviceMasterDowloadObservable(requestMasterdowload)
    //     } else {
    //         console.log('logout');            
    //         this.router.navigate(['']);
    //     }

    
    // }
}
