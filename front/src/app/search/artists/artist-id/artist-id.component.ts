import { Component, OnInit, inject } from '@angular/core';
import { SearchBarService } from '../../../services/search-bar.service';
import { TakeIdsService } from '../../../services/take-ids.service';
import { MusicPlayerService } from '../../../services/music-player.service';
import { ArtistID } from '../../../models/artistId.model';
import { ExtractColorService } from '../../../services/extract-color.service';
import { LoadingService } from '../../../services/loading.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SearchServiceService } from '../../../services/search-service.service';


@Component({
  selector: 'app-artist-id',
  templateUrl: './artist-id.component.html',
  styleUrl: './artist-id.component.css'
})
export class ArtistIdComponent implements OnInit {

  playListSearch = inject(SearchBarService)
  takeId = inject(TakeIdsService)
  loadingService = inject(LoadingService)
  musicPlayer = inject(MusicPlayerService)
  searcherTerm = inject(SearchServiceService)
  extractColor = inject(ExtractColorService)
  route = inject(ActivatedRoute)

  subscription: Subscription;
  colorDominanteArtist: number[] = [];
  rgbaString: string = '';
  buscar: boolean = false;
  loading: boolean = false;
  globalVolume: number = 0.1;
  artistId: string = this.takeId.getAlgoId();

  artistName: string = '';
  artistImage: string = '';
  artistType: string = '';
  artistGenres: string [] = [];
  artistFollowers: number = 0;
  artistPopularity: number = 0;

  albumList: any[] = [];

  trackList: any[] = [];

  artistList: any[] = [];

  takeIdAll(id: string) {
    this.takeId.setAlgoId(id);
    this.artistId = id;
  }

  ngOnInit(): void {
      this.subscription = this.route.paramMap.subscribe(params => {
        const term = params.get('Id');
        if (term) {
          this.artistId = term;
          this.searcherTerm.setSearchTerm(term);
          this.buscarArtist(); 
        }
      });
    }

    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

  buscarArtist(): void {
    this.loading = true;
    this.loadingService.setLoading(true)

    this.colorDominanteArtist = [];

    this.albumList = [];

    this.trackList = [];

    this.artistList = []

    this.playListSearch.getArtistId(this.artistId).subscribe((response: ArtistID) => {
      this.artistName = response.artistInfo.name;
      this.artistType = response.artistInfo.type;
      this.artistFollowers = response.artistInfo.followers.total;
      this.artistImage = response.artistInfo.images[0].url;
      this.artistPopularity = response.artistInfo.popularity;
      this.artistGenres = response.artistInfo.genres;
      this.colorDominante(this.artistImage);

      this.albumList = response.albums.items

      this.trackList = response.topTracks.tracks

      this.artistList = response.relatedArtists.artists

      this.loadingService.setLoading(false);
      this.loading = false;
      this.buscar = true;
    });
  }

  //Zona de Reproducción
  stopMusic() {
    this.musicPlayer.stopMusic();
  }

  togglePlayBack(previewUrl: string) {
    this.musicPlayer.togglePlayBack(previewUrl);
  }

  setVolume(volume: number) {
    this.musicPlayer.setVolume(volume);
  }

  ajustarVolume() {
    this.musicPlayer.setVolume(this.globalVolume);
  }

  async colorDominante(imageUrl: string) {
    this.extractColor.getColorDominante(imageUrl)
      .then(color => {
        for (let colore of color) {
          this.colorDominanteArtist.push(colore);
        }
      })
      .catch(error => {
        console.error('Error al obtener el color dominante', error);
      })
  }
}


