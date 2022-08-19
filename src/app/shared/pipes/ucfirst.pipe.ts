import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ucfirst'
})
export class UcfirstPipe implements PipeTransform {
  transform(text: string): any {
    if (!text) {
      return;
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
