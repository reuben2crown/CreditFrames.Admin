import { Component, Injectable } from '@angular/core';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable({ providedIn: 'root' })
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    // if (value) {
    //   let date = value.split(this.DELIMITER);
    //   return {
    //     day: parseInt(date[0], 10),
    //     month: parseInt(date[1], 10),
    //     year: parseInt(date[2], 10),
    //   };
    // }
    if (!value) return null;
    let parts = value.split(this.DELIMITER);
    return { year: +parts[0], month: +parts[1], day: +parts[2] };
    //return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date
      ? date.year +
          this.DELIMITER +
          ('0' + date.month).slice(-2) +
          this.DELIMITER +
          ('0' + date.day).slice(-2)
      : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable({ providedIn: 'root' })
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : '';
  }
}
