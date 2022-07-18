import { environment } from 'src/environments/environment';
import { Masterdowload } from 'src/app/class/masterdowload';
const CryptoJS = require('crypto-js');

export const tokenCookieName = "auth_token_" + environment.NAME_COMPANY;
export const userCookieName = "user_Login_" + environment.NAME_COMPANY;
export const userDriverCookieName = "user_Login_Driver" + environment.NAME_COMPANY;
export const maestrosCookieName = "user_maestros_" + environment.NAME_COMPANY;
export const searchCookieName = "search_trip" + environment.NAME_COMPANY;

export const encPassword = "nexus" + environment.NAME_COMPANY;
export const valueCookieLogin = "nexus" + environment.NAME_COMPANY;
// export const maestrosCookieName = "user_maestros_" + environment.NAME_COMPANY;

export function setCookie(cname: any, cvalue: any, exdays?: number) {
    cvalue = fnEncriptCookie(cvalue);
    exdays = (exdays) ? exdays : 365
    var d = new Date();
    d.setTime(d.getTime() + (1000 * 60 * 60 * 24));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function removeCookie(cname: string) {
    var d = new Date();
    d.setTime(d.getTime() - (1000 * 60 * 60 * 24));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + ";" + expires + ";path=/";
}

export function getCookie(cname: string) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            // return c.substring(name.length, c.length);
            return fnDesencriptCookie(c.substring(name.length, c.length));
        }
    }
    return "";
}

export function cookieTokenAdd(tokenId: string) {
    if (getCookie(tokenCookieName) == "") {
        setCookie(tokenCookieName, tokenId)
    }
}

export function cookieTokenRemove() {
    removeCookie(tokenCookieName);
}

// export function cookieMaestrosAdd(descargaMaestro: Masterdowload) {
//     let lstCabeceras: string[] = Object.keys(descargaMaestro);
//     lstCabeceras.forEach(cabecera => {
//         setCookie(cabecera + '_' + environment.NAME_COMPANY, JSON.stringify(descargaMaestro[cabecera]));
//     });
// }

// export function cookieMaestrosRemove() {
//     let masterdowload: Masterdowload = new Masterdowload();
//     let lstCabeceras: string[] = Object.keys(Masterdowload);
//     lstCabeceras.forEach(cabecera => {
//         if (getCookie(cabecera + '_' + environment.NAME_COMPANY).length > 0) {
//             masterdowload[cabecera] = JSON.parse(getCookie(cabecera + '_' + environment.NAME_COMPANY));
//         }
//     });
//     return masterdowload;
// }

export function fnEncriptCookie(cvalue: string) {
    return CryptoJS.AES.encrypt(cvalue.trim(), encPassword.trim()).toString();
}

export function fnDesencriptCookie(cvalue: string) {
    return CryptoJS.AES.decrypt(cvalue.trim(), encPassword.trim()).toString(CryptoJS.enc.Utf8);
}
