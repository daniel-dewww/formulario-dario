import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from "@angular/router";
import { Injectable } from "@angular/core";
import * as Cookie from '../util/cookies/cookies';
import { CourrentUser } from 'src/app/class/masterdowload';

@Injectable()
export class AuthenticationResolve implements Resolve<any> {

    constructor(
        private router: Router,
        private route: ActivatedRoute,      
    ) {
    }

    async resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = await Cookie.getCookie(Cookie.userCookieName).toString();
        let jsonUser: CourrentUser = (user.length > 0) ? JSON.parse(user): undefined;
        if (jsonUser) {             
            this.router.navigate(['../../core/'], { relativeTo: this.route });
        } 
    }
}

