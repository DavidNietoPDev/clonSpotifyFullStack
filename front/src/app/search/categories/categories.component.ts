import { Component, OnInit, inject } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { TakeIdsService } from '../../services/take-ids.service';
import { ExtractColorService } from '../../services/extract-color.service';
import { Category } from '../../models/categry.model';
import { SearchServiceService } from '../../services/search-service.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  searchTerm = inject(SearchServiceService)
  categoriesSearch = inject(SearchBarService)
  takeIdAll = inject(TakeIdsService)
  extractColor = inject(ExtractColorService)
  loading: boolean = false;
  buscar: boolean = false;
  colorDominanteCategory: number [] = [];

  categoryId: string = this.takeIdAll.getAlgoId()
  imageCategory: string = '';
  nameCategory: string = '';

  imageSimilar: string[] = [];
  artistSimilarList: string[] = [];
  artistSimilarId: string [] = []; 

  topTrackId: string[] = [];
  topTrackUrl: string[] = [];
  topTrack: string[] = [];
  topTrackDuration: number[] = [];
  topTrackArtist: string[] = [];
  topTrackArtistTwo: string[] = [];
  topTrackArtistImage: string[] = [];
  idArtistTracks: string [] = [];
  idArtistTracksTwo: string [] = [];


  topAlbum: string[] = [];
  topAlbumImage: string[] = [];
  topAlbumArtist: string[] = [];
  topAlbumYear: string[] = [];
  idsAlbum: string[] = [];


  idsPlaylist: string[] = [];
  playList: string[] = [];
  playListImage: string[] = [];
  playListName: string[] = [];
  idArtists: string [] = [];
  idArtist: string = '';
  imageUrl: string = '';
  artist: any;


  ngOnInit(): void {
    this.buscarCategories();
  }


  takeId(id: string) {
    this.takeIdAll.setAlgoId(id);
  }

  buscarCategories() {
    this.loading = true;
    this.categoriesSearch.getCategoryId(this.categoryId).subscribe((response: Category) => {
      this.imageCategory = response.categoryInfo.icons[0].url;
      this.colorDominante(this.imageCategory)
      this.nameCategory = response.categoryInfo.name;

    })
    this.loading = false;
  }

  async colorDominante(imageUrl: string) {
    this.extractColor.getColorDominante(imageUrl)
      .then(color => {
        for (let colore of color) {
          this.colorDominanteCategory.push(colore);
        }
      })
      .catch(error => {
        console.error('Error al obtener el color dominante', error);
      })
  }
}
