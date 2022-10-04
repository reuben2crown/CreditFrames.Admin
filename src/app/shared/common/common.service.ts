import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormGroup, FormControl, FormArray, ValidationErrors } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public loadingMsg: string;
  public loading = false;
  public spinnerName: string = '';

  constructor(
    private nzMessageService: NzMessageService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) { }

  public showLoading(message: string = 'Please wait...', spinnerName = '') {
    if (!this.loading) {
      setTimeout(() => {
        this.nzMessageService.loading(message, { nzDuration: 0 });
        this.loading = true;
        // this.loadingMsg = message;
        // this.spinnerName = spinnerName;
        // this.spinner.show(spinnerName);
      }, 1);
    }
  }

  public hideLoading() {
    if (this.loading) {
      setTimeout(() => {
        this.nzMessageService.remove();
        this.loading = false;
        // this.spinner.hide(spinnerName || this.spinnerName);
      }, 300);
    }
  }

  showMessage(message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info'): void {
    this.nzMessageService.create(type, message);
  }

  public showToastSuccess(msg: string, title = null, config = {}) {
    this.toastr.success(msg, title, config);
  }

  public showToastError(msg, title = null, config = {}) {
    this.toastr.error(msg, title, config);
  }

  public showToastWarning(msg, title = null, config = {}) {
    this.toastr.warning(msg, title, config);
  }

  public showToastInfo(msg, title = null, config = {}) {
    this.toastr.info(msg, title, config);
  }

  public getCaptcha(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  public exportFromApi(fileName: string, data: any, type: string) {
    const binaryData = [];
    binaryData.push(data);
    const url = window.URL.createObjectURL(new Blob(binaryData, { type }));
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  bytesToSize(bytes: any) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt((Math.floor(Math.log(bytes) / Math.log(1024))).toString(), 10)
    if (i === 0) return `${bytes} ${sizes[i]})`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
  }

  public checkFormValidation(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((x) => {
      const control = formGroup.get(x);
      // FormControl
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
        control.updateValueAndValidity({ onlySelf: true });
      }

      // FormGroup
      if (control instanceof FormGroup) {
        this.checkFormValidation(control);
      }

      // FormArray
      if (control instanceof FormArray) {
        for (const item of control.controls) {
          if (item instanceof FormGroup) {
            this.checkFormValidation(item);
          }
        }
      }
    });
  }

  getFormValidationErrors(formGroup: FormGroup): AllValidationErrors[] {
    let controls = formGroup.controls;
    let errors: AllValidationErrors[] = [];
    Object.keys(controls).forEach(key => {
      const control = controls[key];
      if (control instanceof FormGroup) {
        errors = errors.concat(this.getFormValidationErrors(control));
      }
      // FormArray
      if (control instanceof FormArray) {
        for (const item of control.controls) {
          if (item instanceof FormGroup) {
            errors = errors.concat(this.getFormValidationErrors(item));
          }
        }
      }
      const controlErrors: ValidationErrors = controls[key].errors;
      if (controlErrors !== null) {
        Object.keys(controlErrors).forEach(keyError => {
          errors.push({
            control_name: key,
            error_name: keyError,
            error_value: controlErrors[keyError]
          });
        });
      }
    });
    return errors;
  }

  titleCase(input: any): string {
    if (!input) {
      return '';
    } else {
      return input.replace(/\w\S*/g, (txt) => txt[0].toUpperCase() + txt.substr(1).toLowerCase());
    }
  }

  getEnumValue(myEnum: any, enumKey: any) {
    const KeyAsString = enumKey.toString();
    enumKey = myEnum[this.titleCase(KeyAsString)];
    return enumKey;
  }

  convertSecondsToDhms(value, unit: 'Seconds' | 'Minutes') {
    if (value) {
      const seconds = (unit == 'Seconds') ? Number(value) : Number(value) * 60;
      var d = Math.floor(seconds / (3600 * 24));
      var h = Math.floor(seconds % (3600 * 24) / 3600);
      var m = Math.floor(seconds % 3600 / 60);
      var s = Math.floor(seconds % 60);
  
      var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
      var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
      return (dDisplay + hDisplay + mDisplay + sDisplay).replace(/,\s*$/, "");
    }

    return null;
  }

  formatResponseDate(date) {
    const responseDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    if (date) {
      let d = responseDate.split('-');
      const result = {
        year: Number(d[0]),
        month: Number(d[1]),
        day: Number(d[2]),
      };
      return result;
    }
    return null;
  }

  getCalenderDate(input: any) {
    let date = new Date();
    if (input) {
      date = new Date(input.year, input.month - 1, input.day + 1);
    }
    return date;
  }

  public handleError(error) {
    let message: string;
    if (error.status === 0) {
      message = 'Network or Server error. Please try again';
    } else if (error.status === 401) {
      message = 'Session error. Please try again';
    } else {
      // const message = JSON.parse(await error.error.text()).message;
      if (error.hasOwnProperty('error')) {
        message = error.error != null ? error.error.message : 'Server Error. Try again later';
      } else {
        message = error.message;
      }
    }
    this.hideLoading();
    this.showToastError(message || 'Unknown error occured');
  }
}

export interface AllValidationErrors {
  control_name: string;
  error_name: string;
  error_value: any;
}
