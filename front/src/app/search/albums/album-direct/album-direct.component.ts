import { Component, OnInit, inject } from '@angular/core';
import { SearchBarService } from '../../../services/search-bar.service';
import { TakeIdsService } from '../../../services/take-ids.service';
import { MusicPlayerService } from '../../../services/music-player.service';
import { AlbumID } from '../../../models/albumId.model';
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
  musicPlayer = inject(MusicPlayerService)
  extractColor = inject(ExtractColorService)
  searcherTerm = inject(SearchServiceService)
  route = inject(ActivatedRoute)
  subscription: Subscription;

  buscar: boolean = false;
  loading: boolean = false;
  globalVolume: number = 0.1;
  albumId: string = this.takeId.getAlgoId();
  colorDominanteAlbum: number[] = [];

  trackUrl: string[] = [];
  trackId: string[] = [];
  tracksList: string[] = [];
  tracksArtist: string[] = [];
  trackArtistTwo: string[] = [];
  tracksDuration: number[] = []; 
  idArtistTracks: string[] = [];
  idArtistTracksTwo: string[] = [];

  albumArtists: string[] = [];

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
    }

    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

  takeIdAll (id: string) {
    this.takeId.setAlgoId(id);
  }

  buscarAlbum(): void {
    this.loadingService.setLoading(true);
    this.loading = true;
    this.colorDominanteAlbum = [];

    this.trackUrl = [];
    this.tracksList = [];
    this.tracksDuration = [];
    this.tracksArtist = [];
    this.trackArtistTwo = [];
    this.idArtistTracks = [];
    this.idArtistTracksTwo = [];
    this.trackId = [];

    this.albumArtists = [];
    this.playListSearch.getAlbumId(this.albumId).subscribe((response: AlbumID) => {


      this.releaseDate = response.release_date;
      this.typeAlbum = response.album_type;
      this.listImage = response.images[0].url;
      this.colorDominante(this.listImage);
      this.listName = response.name;
      
      for (let artist of response.artists) {
        this.albumArtists.push(artist.name)
      }
      for (let track of response.tracks.items) {

        this.trackId.push(track.id);
        this.trackUrl.push(track.preview_url);
        this.listCanciones = track.track_number;

        this.tracksList.push(track.name);

        this.idArtistTracks.push(track.artists[0].id)
        this.tracksArtist.push(track.artists[0].name)

        if (track.artists && track.artists.length > 1) {
          this.trackArtistTwo.push(track.artists[1].name);
          this.idArtistTracksTwo.push(track.artists[1].id)
      } else {
          this.trackArtistTwo.push('');
          this.idArtistTracksTwo.push('');
      }
        this.tracksDuration.push(track.duration_ms);
        
      }
      this.loadingService.setLoading(false);
      this.loading = false;
      this.buscar = true;
    });
  }

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
  

  


