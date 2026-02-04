import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencypipe',
  standalone: true
})
export class CurrencypipePipe implements PipeTransform {

  transform(value: number): string {
    if (value == null)
      return '';

    const number: number = value;
    const absNumber = Math.abs(number);

    // Format based on magnitude
    if (absNumber >= 1_000_000_000) {
      return '₹' + (number / 1_000_000_000).toFixed(2) + 'B';
    } else if (absNumber >= 1_000_000) {
      return '₹' + (number / 1_000_000).toFixed(2) + 'M';
    } else if (absNumber >= 1_000) {
      return '₹' + (number / 1_000).toFixed(2) + 'K';
    } else {
      return '₹' + number.toFixed(2);
    }
  }
}

