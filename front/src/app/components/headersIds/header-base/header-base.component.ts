import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-base',
  templateUrl: './header-base.component.html',
  styleUrl: './header-base.component.css'
})
export class HeaderBaseComponent {

  @Input() colorDominantImage: number[] = [];
  @Input() imageId: string = '';
  @Input() typeId: string = '';
  @Input() nameId: string = '';
  @Input() nameArtistOrFollowers: string[] | number;
  @Input() releaseDate: string[] | string;
  @Input() numberSongsOrPopularity: number;
  @Input() search: boolean;

  isNumber(value: any): boolean {
    return !isNaN(Number(value));
  }

  isEmpty(value: string[] | string): boolean {
    if (Array.isArray(value)) {
      // Si es un array, verificamos si está vacío
      return value.length === 0;
  } else if (typeof value === 'string') {
      // Si es una cadena, verificamos si está vacía o contiene solo espacios en blanco
      return value.trim().length === 0;
  } else {
      // Si no es ni un array ni una cadena, se considera vacío
      return true;
  }
}

  isGenres(value: string[] | string):boolean {
    return typeof value !== 'string';
  }
}
