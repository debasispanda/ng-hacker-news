import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlHostname'
})
export class UrlHostnamePipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      return new URL(value).hostname;
    }
    return '';
  }

}
