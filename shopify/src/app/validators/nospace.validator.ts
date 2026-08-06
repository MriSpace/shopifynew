import { AbstractControl, ValidationErrors } from "@angular/forms";

export function nospaceValidator(control: AbstractControl): ValidationErrors | null {
    const hasSpace = (control.value || '').includes(' ');
    return hasSpace ? {hasSpace: true} : null;
}