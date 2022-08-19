import { AbstractControl, ValidationErrors } from '@angular/forms';
  
export class WhiteSpaceValidator {
    static noWhiteSpace(control: AbstractControl): ValidationErrors | null {
        let value = (control.value as string);
        if (!value) {
            return null;
        }

        return (value?.indexOf(' ') > -1 || value?.indexOf('') > -1) ? {hasWhiteSpace: true} : null;
    }
}