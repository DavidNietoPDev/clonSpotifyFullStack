import { Component, OnInit, inject } from '@angular/core';
import { SearchBarService } from '../../../services/search-bar.service';
import { TakeIdsService } from '../../../services/take-ids.service';
import { AlbumID, Item } from '../../../models/albumId.model';
import { ExtractColorService } from '../../../services/extract-color.service';
import { LoadingService } from '../../../services/loading.service';
import { SearchServiceService } from '../../../services/search-service.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album-direct',
  templateUrl: './album-direct.component.html',
  styleUrl: './album-direct.component.css'
})
export class AlbumDirectComponent  implements OnInit  {

  playListSearch = inject(SearchBarService)
  takeId = inject(TakeIdsService)
  loadingService = inject(LoadingService)
  extractColor = inject(ExtractColorService)
  searcherTerm = inject(SearchServiceService)
  route = inject(ActivatedRoute)
  subscription: Subscription;
  subLoad: Subscription;

  trackList: Item [] = [];
  buscar: boolean = false;
  loading: boolean = true;
  albumId: string = this.takeId.getAlgoId();
  
  albumArtists: string[] = [];
  colorDominanteAlbum: number[] = [];
  listName: string = '';
  releaseDate: string = '';
  typeAlbum: string = '';
  listCanciones: number = 0;
  listImage: string = '';

  ngOnInit(): void {
      this.subscription = this.route.paramMap.subscribe(params => {
        const term = params.get('Id');
        if (term) {
          this.albumId = term;
          this.searcherTerm.setSearchTerm(term);
          this.buscarAlbum(); 
        }
      });
      this.subLoad = this.loadingService.isLoading$().subscribe(state => {
        this.loading = state;
      })
    }

    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      } else if (this.subLoad) {
        this.subLoad.unsubscribe()
      }
    }

  takeIdAll (id: string) {
    this.takeId.setAlgoId(id);
  }

  buscarAlbum(): void {
    this.loadingService.setLoading(true);
    this.loading = true;
    this.buscar = true;
    this.colorDominanteAlbum = [];
    this.albumArtists = [];
    this.playListSearch.getAlbumId(this.albumId).subscribe((response: AlbumID) => {
      this.releaseDate = response.release_date;
      this.typeAlbum = response.album_type;
      this.listImage = response.images[0].url;
      this.colorDominante(this.listImage);
      this.listName = response.name;

      this.trackList = response.tracks.items

      for (let artist of response.artists) {
        this.albumArtists.push(artist.name)
      }
      this.loadingService.setLoading(false)
    });

  }

   //función para extraer el color de la imagen

   async colorDominante(imageUrl: string) {
    this.extractColor.getColorDominante(imageUrl)
      .then(color => {
        for (let colore of color) {
          this.colorDominanteAlbum.push(colore);
        }
      })
      .catch(error => {
        console.error('Error al obtener el color dominante', error);
      })
  }
}
  

  


