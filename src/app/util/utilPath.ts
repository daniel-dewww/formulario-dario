export function validatePath(pathName: string): boolean{    
    var lstPath: string[] = pathName.split('/');
    var changeScreen = false;
    let pathComplete = lstPath[lstPath.length-2] + '/' + lstPath[lstPath.length-1];

    if(pathComplete === 'core/operaciones'){
        changeScreen = true;
    }
    
    return changeScreen;
}