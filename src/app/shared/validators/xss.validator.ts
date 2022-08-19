import { AbstractControl, ValidationErrors } from '@angular/forms';

export class XssValidator {
    static antiXss(control: AbstractControl): ValidationErrors | null {
        let value = (control.value as string);
        if (!value) {
            return null;
        }

        var regexp = /[!@#$%^&*()+\~=\[\]{};':"\\|<>\/?]+/;

        return (regexp.test(value)) ? { 'xssInvalid': { regexp } } : null;
    }
}