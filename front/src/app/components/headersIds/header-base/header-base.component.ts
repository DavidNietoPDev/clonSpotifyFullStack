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
  @Input() releaseDate: string = '';
  @Input() numberSongsOrPopularity: number | string;
  @Input() search: boolean;

  isNumber(value: any): boolean {
    return !isNaN(Number(value));
  }
}
