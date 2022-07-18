import { Dictionary } from 'lodash';
import { environment } from 'src/environments/environment';

export function ToastBadRequest(code: string, detail: string): string {
    let serviceMessage = environment.MSJE_CLIENTE.SERVICE_MENSAJE as Dictionary<string>;
    if (code && serviceMessage[code]) {
        return serviceMessage[code];
    } else {
        return detail;
    }

}