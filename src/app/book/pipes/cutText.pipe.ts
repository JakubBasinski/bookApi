import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cutText' })
export class CutTextPipe implements PipeTransform {
  transform(
    value: string | undefined,
    maxLength: number = 200
  ): string | undefined {
    if (value && value.length >= 200) {
      return value.substring(0, 200) + '...';
    }

    return value;
  }
}
