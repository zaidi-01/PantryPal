import { Pipe, PipeTransform } from '@angular/core';

/**
 * Highlights a keyword in a string.
 */
@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, keyword: string): string {
    if (!value || !keyword) {
      return value;
    }

    const regex = new RegExp(keyword, 'gi');
    return value.replace(
      regex,
      (match) => `<strong><mark>${match}</mark></strong>`
    );
  }
}

