
// Añadir Minutos al dateTime; para covertirlo en string; 
// para que lea el input tipo time
export function fnFormatTimeString(dateEdit: Date, timePlus?: number): string {
    timePlus = (timePlus != undefined) ? timePlus : 0;
    var dia = new Date(dateEdit.getFullYear(), dateEdit.getMonth(), dateEdit.getDate(), dateEdit.getHours(), dateEdit.getMinutes() + timePlus, dateEdit.getSeconds());
    return ((dia.getHours() < 10) ? ('0' + dia.getHours()) : (dia.getHours())) + ':' + ((dia.getMinutes() < 10) ? ('0' + dia.getMinutes()) : (dia.getMinutes()))
}

// Sirve para enviar la fecha del servicio sin utc; 
// ya q angular al enviar la hora añade a la fecha UTC
export function fnUnionDate_TimeString_WhitoutUTC(dateD: Date, timeS: string): Date {
    let splitTime = timeS.split(':')
    return new Date(Date.UTC(dateD.getFullYear(), dateD.getMonth(), dateD.getDate(),
        parseInt(splitTime[0]), parseInt(splitTime[1]), 0, 0))
}

export function fnFormatTimeTimePlus(dateEdit: Date, timePlus: number): Date {
    timePlus = (timePlus != undefined) ? timePlus : 0;
    var dia = new Date(dateEdit.getFullYear(), dateEdit.getMonth(), dateEdit.getDate(), dateEdit.getHours(), dateEdit.getMinutes() + timePlus, dateEdit.getSeconds());
    return dia;
}

// Unir un date con un time(string) + tiempo adicional
export function fnUnionDate_TimeString(dateD: Date, timeS: string, timePlus?: number): Date {
    timePlus = (timePlus != undefined) ? timePlus : 0
    let splitTime = timeS.split(':')
    return new Date(dateD.getFullYear(), dateD.getMonth(), dateD.getDate(),
        parseInt(splitTime[0]), parseInt(splitTime[1]) + timePlus, 0, 0)
}

export function fnDateToStringAllDatePlataform(date: Date): string {
    var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    let dia: Date;
    if (iOS) {
        dia = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
            date.getHours(), date.getMinutes() + date.getTimezoneOffset(), date.getSeconds(), date.getMilliseconds())
    } else {
        dia = new Date(date);
    }

    return ((dia.getDate() >= 10) ? dia.getDate() + '' : '0' + dia.getDate()) + '-' +
        (((dia.getMonth() + 1) >= 10) ? (dia.getMonth() + 1) + '' : '0' + (dia.getMonth() + 1)) + '-' +
        dia.getFullYear() + ' ' +
        ((dia.getHours() < 10) ? ('0' + dia.getHours()) : (dia.getHours())) + ':' +
        ((dia.getMinutes() < 10) ? ('0' + dia.getMinutes()) : (dia.getMinutes()))
}

export function fnDateToStringPlataform(date: Date): string {
    var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    let dia: Date;
    if (iOS) {
        dia = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
            date.getHours(), date.getMinutes() + date.getTimezoneOffset(), date.getSeconds(), date.getMilliseconds())
    } else {
        dia = new Date(date);
    }

    return ((dia.getHours() < 10) ? ('0' + dia.getHours()) : (dia.getHours())) + ':' + ((dia.getMinutes() < 10) ? ('0' + dia.getMinutes()) : (dia.getMinutes()))
}

// Segun la plataforma; se configura; para quitar o mantener el utc al DateTime
// ya q la plataforma iOS añade utc y los otros lo mantiene el valor.
export function fnDateforPlatform(date?: Date | string): Date {
    if(date){
        var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        var dia = new Date(date)
    
        if (iOS) {
            return new Date(dia.getFullYear(), dia.getMonth(), dia.getDate(),
                dia.getHours(), dia.getMinutes() + dia.getTimezoneOffset(), 0, 0)
        }

        return new Date(date)
    }
    return new Date();
}

export function fnDateforPlatformNoUTC(dateD: Date): Date {
    if(dateD){
        var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        var dia = new Date(dateD)
    
        if (iOS) {
            return new Date(dia.getFullYear(), dia.getMonth(), dia.getDate(),
                dia.getHours(), dia.getMinutes() + dia.getTimezoneOffset(), 0, 0)
        }

        return new Date(
            dateD.getUTCFullYear(), 
            dateD.getUTCMonth(), 
            dateD.getUTCDate(),
            0, 0, 0, 0)
    }
    return null!;
}

export function fnDateToUnixTime(date: Date): number {
    return parseInt((date.getTime() / 1000).toFixed(0))
}

export function fnUnixTimeToDate(date: number): Date {
    var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

    var dia = new Date(date * 1000)
    // if (!iOS) {
    //     var dia = new Date(date)
    //     return new Date(dia.getFullYear(), dia.getMonth(), dia.getDate(),
    //         dia.getHours(), dia.getMinutes() + dia.getTimezoneOffset(), 0, 0)
    // }

    return dia;
}

export function fnUnixTimeToDateForPlataform(date: number): Date {
    var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

    var dia = new Date(date * 1000)
    if (!iOS) {
        return new Date(dia.getFullYear(), dia.getMonth(), dia.getDate(),
            dia.getHours(), dia.getMinutes() + dia.getTimezoneOffset(), 0, 0)
    }

    return dia;
}

export function fnServiceDateSendString(date: Date, timeS: string): string {
    Date.prototype.toISOString = function () {
        var tzo = -this.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function (num: number) {
                var norm = Math.floor(Math.abs(num));
                return (norm < 10 ? '0' : '') + norm;
            };
        return this.getFullYear() +
            '-' + pad(this.getMonth() + 1) +
            '-' + pad(this.getDate()) +
            'T' + pad(this.getHours()) +
            ':' + pad(this.getMinutes()) +
            ':' + pad(this.getSeconds()) +
            dif + pad(tzo / 60) +
            ':' + pad(tzo % 60);
    }

    return fnUnionDate_TimeString(date, timeS).toISOString()
}
export function fnServiceDateSendStringv2(date: Date, timeS: string): string {
    Date.prototype.toISOString = function () {
        var tzo = -this.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function (num: number) {
                var norm = Math.floor(Math.abs(num));
                return (norm < 10 ? '0' : '') + norm;
            };
        return this.getFullYear() +
            '-' + pad(this.getMonth() + 1) +
            '-' + pad(this.getDate()) +
            'T' + pad(this.getHours()) +
            ':' + pad(this.getMinutes()) +
            ':' + pad(this.getSeconds()) +
            'Z'
            ;
    }

    return fnUnionDate_TimeString(date, timeS).toISOString()
}


export function fnServiceDateSend(date: Date): string {
    Date.prototype.toISOString = function () {
        var tzo = -this.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function (num: number) {
                var norm = Math.floor(Math.abs(num));
                return (norm < 10 ? '0' : '') + norm;
            };
        return this.getFullYear() +
            '-' + pad(this.getMonth() + 1) +
            '-' + pad(this.getDate()) +
            'T' + pad(this.getHours()) +
            ':' + pad(this.getMinutes()) +
            ':' + pad(this.getSeconds()) +
            dif + pad(tzo / 60) +
            ':' + pad(tzo % 60);
    }

    return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
        date.getHours(), date.getMinutes() + date.getTimezoneOffset(), 0, 0).toISOString()
}

export function date1MayorToDate2(date1: Date, date2: Date): boolean {
    if (date1 > date2) {
        return true;
    }
    return false;
}

export function dateTimeString(dateString: string): string {
    let date = new Date(dateString);
    let dateTime: string;
    let year, month, day, hour, minute, second: string;

    year = date.getFullYear();
    month = ((date.getMonth() + 1) >= 10) ? (date.getMonth() + 1) + '' : '0' + (date.getMonth() + 1);
    day = (date.getDate() >= 10) ? date.getDate() + '' : '0' + date.getDate();

    hour = (date.getHours() >= 10) ? date.getHours() + '' : '0' + date.getHours();
    minute = (date.getMinutes() >= 10) ? date.getMinutes() + '' : '0' + date.getMinutes();
    second = (date.getSeconds() >= 10) ? date.getSeconds() + '' : '0' + date.getSeconds();

    dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return dateTime;
}

export function dateString(dateString: Date): string {
    let date = new Date(dateString);
    let dateTime: string;
    let year, month, day: string;

    year = date.getFullYear();
    month = ((date.getMonth() + 1) >= 10) ? (date.getMonth() + 1) + '' : '0' + (date.getMonth() + 1);
    day = (date.getDate() >= 10) ? date.getDate() + '' : '0' + date.getDate();

    dateTime = year + '-' + month + '-' + day;
    return dateTime;
}
export function date1MinusToDate2Minutes(date1: Date, date2: Date): number{
    let minute: number;
    minute =+((date1.getTime() - date2.getTime()) / 1000 / 60).toFixed(0)
    return minute;
}