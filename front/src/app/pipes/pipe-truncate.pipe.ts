import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeTruncate'
})
export class PipeTruncatePipe implements PipeTransform {

  transform(name: string): string {
    const length = 22;
    if (name.length > length) {
      return name.substring(0, length - 3) + '...';
    } else {
      return name;
    }
  }

}
