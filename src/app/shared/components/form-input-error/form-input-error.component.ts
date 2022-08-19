import { Component, OnInit, Input } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-input-error',
  templateUrl: './form-input-error.component.html',
  styleUrls: ['./form-input-error.component.scss']
})
export class FormInputErrorComponent implements OnInit {
  @Input() message: string;
  @Input() control: FormControl;

  constructor() { }

  ngOnInit() {
  }

  get errorMessage() {
    let errors: ValidationErrors = this.control.errors;

    if (!errors) {
      this.message = null;
    } else if (errors['serverError']) {
      this.message = errors['serverError'];
    } else if (errors['required']) {
      this.message = 'This field is required';
    } else if (errors['hasWhiteSpace']) {
      this.message = 'Empty space is not allowed.';
    } else if (errors['minlength']) {
      this.message = `Max length is ${errors['minlength'].actualLength}/${errors['minlength'].requiredLength}`;
    } else if (errors['maxlength']) {
      this.message = `Min length is ${errors['maxlength'].actualLength}/${errors['maxlength'].requiredLength}`;
    } else if (errors['email']) {
      this.message = 'Email is not valid';
    } else if (errors['min']) {
      this.message = `Min value is ${errors['min'].min}, actual value is ${errors['min'].actual}`;
    } else if (errors['max']) {
      this.message = `Max value is ${errors['max'].max}, actual value is ${errors['max'].actual}`;
    } else if (errors['pattern']) {
      this.message = 'Invalid value';
    } else if (errors['passwordMismatch']) {
      this.message = 'Passwords do not match';
    } else if (errors['xssInvalid']) {
      this.message = 'Unwanted invalid characters.';
    } else {
      this.message = '';
    }
    return this.message;
  }

}
