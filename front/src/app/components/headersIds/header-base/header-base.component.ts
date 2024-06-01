import { Component, Input, inject } from '@angular/core';
import { ExtractColorService } from '../../../services/extract-color.service';

@Component({
  selector: 'app-header-base',
  templateUrl: './header-base.component.html',
  styleUrl: './header-base.component.css'
})
export class HeaderBaseComponent {

  extractColor = inject(ExtractColorService)

  @Input() colorDominantImage: number[] = [];
  @Input() imageId: string = '';
  @Input() typeId: string = '';
  @Input() nameId: string = '';
  @Input() nameArtistOrFollowers: string[] | number;
  @Input() releaseDate: string = '';
  @Input() numberSongsOrPopularity: number | string;
  @Input() search: boolean;

  async colorDominante(imageUrl: string) {
    this.extractColor.getColorDominante(imageUrl)
      .then(color => {
        for (let colore of color) {
          this.colorDominantImage.push(colore);
        }
      })
      .catch(error => {
        console.error('Error al obtener el color dominante', error);
      })
  }
}
