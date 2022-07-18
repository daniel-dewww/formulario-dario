export function scrollToBottomId(idElement: string) {
    const element = <HTMLInputElement>document.getElementById(idElement);
    element.scrollTo({ top: Math.max(0, element.scrollHeight - element.offsetHeight) });}

    // element.scrollTo({
    //     top: Math.max(0, element.scrollHeight - element.offsetHeight),
    //     behavior: 'smooth'
    //   });

export function DoScrollPositionTable(index: number, idDivTable: string, idRowTable: string, dismissOffset?: number) {
    dismissOffset = (dismissOffset)?dismissOffset : 0;
    index = (index - 1 < 0) ? 0 : (index -1); 

    let container: HTMLElement = document.getElementById(idDivTable)!;
    let rowToScrollTo:HTMLElement = document.getElementById(idRowTable + index)!;
    
    let topScroll = (rowToScrollTo.offsetTop - dismissOffset < 0) ? 0 : (rowToScrollTo.offsetTop -50); 

    container.scrollTo({ top: topScroll});
}

export function isNotPC(): boolean {
    return window.innerWidth <= 1024;
}

export function fnStyleBasedBrightness(color: string): any {
    return {
        background: color,
        color: fnColorBasedBrightness(color)
    };
}

export function fnStyleBasedBrightnessBlackOrWhite(color: string): any {
    return {
        background: color,
        color: fnColorBasedBrightnessBlackOrWhite(color)
    };
}

export function fnColorBasedBrightness(color: string): string {

    if(color && (color.indexOf("#")) == -1){
        color = fnRGBToHex(fnRemoveWhiteSpaces(color));
    }

    color = (color != null) ? color : '#ffffff'
    let colorInt = parseInt(color.slice(1), 16);
    let otherColor = colorInt ^ 0x1FFFFFF;
    
    return '#' + otherColor.toString(16).slice(1);
}

export function fnColorBasedBrightnessBlackOrWhite(color: string): string {

    if(color && (color.indexOf("#")) == -1){
        color = fnRGBToHex(fnRemoveWhiteSpaces(color));
     }

    color = (color != null) ? color : '#ffffff'

    let hexcolor = color.replace("#", "");
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 120) ? '#000000' : '#ffffff';
}

export function fnStyleHeightWidth(height?: number, width?: number): any {

    return {
        'height': height+'px',
        'width': width+'px',
        // 'z-index': '10'
    };
}

export function fnRGBToHex(rgb: string): string {
    let typeRgb = rgb.indexOf('(')
    
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    let arrayRgb: any[] = rgb.substr(typeRgb + 1).split(")")[0].split(sep);
    let hexColor: string = '#';

    for (let R in arrayRgb) {
        let r 
        if(parseInt(R) < 3){
            r = parseInt(arrayRgb[R]).toString(16);
        } else{
            r = Math.round(parseFloat(arrayRgb[R]) * 255).toString(16);
        }
            hexColor = hexColor+r;
    }

    return hexColor;
}

export function fnRemoveWhiteSpaces(word: string): string{
    if(word){
        return word.split(' ').join('');
    } else 
    return word;
}