import { ViewRef, ChangeDetectorRef } from '@angular/core'

export function fnValidateViewExist(ref:ChangeDetectorRef): boolean {
    if (ref !== null && ref !== undefined &&
        !(ref as ViewRef).destroyed) {
            return true
    }
    return false
}