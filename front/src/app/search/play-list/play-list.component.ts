import { Component, OnInit, inject } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { Item, PlayList, Track } from '../../models/playlist.model';
import { TakeIdsService } from '../../services/take-ids.service';
import { ExtractColorService } from '../../services/extract-color.service';
import { LoadingService } from '../../services/loading.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SearchServiceService } from '../../services/search-service.service';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrl: './play-list.component.css'
})
export class PlayListComponent implements OnInit {
  playListSearch = inject(SearchBarService)
  takeId = inject(TakeIdsService)
  loadingService = inject(LoadingService)
  extractColor = inject(ExtractColorService)
  searcherTerm = inject(SearchServiceService)
  route = inject(ActivatedRoute)
  subscription: Subscription;

  loading: boolean = false;
  playListId: string = this.takeId.getAlgoId();

  trackList: Track [] = [];
  lista: Item [] = [];

  colorDominantePlayList: number[] = [];
  listImage: string = '';
  listType: string = '';
  listName: string = '';
  listFollowers: number;
  numberSongs: number;
  buscar: boolean = false;

  takeIdAll(id: string) {
    this.takeId.setAlgoId(id);
    this.playListId = id;
  }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      const term = params.get('Id');
      if (term) {
        this.playListId = term;
        this.searcherTerm.setSearchTerm(term);
        this.buscarPlayList(); 
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  buscarPlayList(): void {
    this.loadingService.setLoading(true)
    this.loading = true;
    this.buscar = true;
    this.colorDominantePlayList = [];

    this.playListSearch.getPlayList(this.playListId).subscribe((response: PlayList) => {
      this.listImage = response.images[0].url
      this.colorDominante(this.listImage);
      this.numberSongs = response.tracks.total
      this.listFollowers = response.followers.total;
      this.listType = response.type;
      this.listName = response.name;
      for (let track of response.tracks.items) {
        this.lista.push(track)
      }
      for(let item of this.lista) {
        this.trackList.push(item.track)
      }
    });
  }

  //función para extraer el color de la imagen
  async colorDominante(imageUrl: string) {
    this.extractColor.getColorDominante(imageUrl)
      .then(color => {
        for (let colore of color) {
          this.colorDominantePlayList.push(colore);
        }
      })
      .catch(error => {
        console.error('Error al obtener el color dominante', error);
      })
  }
}


