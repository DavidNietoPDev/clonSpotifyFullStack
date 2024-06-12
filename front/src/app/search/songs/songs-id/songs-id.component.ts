import { Component, OnInit, inject } from '@angular/core';
import { SearchBarService } from '../../../services/search-bar.service';
import { TakeIdsService } from '../../../services/take-ids.service';
import { MusicPlayerService } from '../../../services/music-player.service';
import { Item, TrackID } from '../../../models/trackId.model';
import { ExtractColorService } from '../../../services/extract-color.service';
import { LoadingService } from '../../../services/loading.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SearchServiceService } from '../../../services/search-service.service';
@Component({
  selector: 'app-songs-id',
  templateUrl: './songs-id.component.html',
  styleUrl: './songs-id.component.css'
})
export class SongsIdComponent implements OnInit {

  playListSearch = inject(SearchBarService)
  takeId = inject(TakeIdsService)
  searcherTerm = inject(SearchServiceService)
  musicPlayer = inject(MusicPlayerService)
  extractColor = inject(ExtractColorService)
  loadingService = inject(LoadingService)
  subscription: Subscription;
  route = inject(ActivatedRoute)

  buscar: boolean = false;
  loading: boolean = false;
  globalVolume: number = 0.1;
  songId: string = this.takeId.getAlgoId();
  colorDominanteTrack: number [] = [];

  artistTwoImage: string = '';

  trackNameArtistTwo: string = '';
  trackNameArtist: string = '';
  trackType: string = '';
  trackName: string = '';
  trackImage: string = '';
  trackReleaseDate: string = '';
  trackPopularity: number = 0;
  trackDuration: number = 0;
  artistFollowers: number = 0;

  trackRecomList: Item [] = [];

  trackArtistList: Item [] = [];

  albumList: any [] = [];

  albumListTwo: any [] = [];

  artistSimilarList: any [] = [];

  albumId: string = '';
  albumTrack: string = '';
  albumType: string = '';
  albumImgTrack: string = '';

  albumTrackList: Item [] = [];
  albumTracksRelease: string = '';

  takeIdAll(id: string) {
    this.takeId.setAlgoId(id);
    this.songId = id;
  }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      const term = params.get('Id');
      if (term) {
        this.songId = term;
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
    this.colorDominanteTrack = [];

    this.albumList = [];

    this.albumListTwo = [];

    this.artistSimilarList = [];

    this.loading = true;
    this.loadingService.setLoading(true)
    this.playListSearch.getTrackId(this.songId).subscribe((response: TrackID) => {
      if(response.artists && response.artists.length > 1) {
        this.artistTwoImage = response.artists[1].images[0].url;
        this.trackNameArtistTwo = response.song.artists[1].name;
      }

      this.artistFollowers = response.artists[0].followers.total;
      this.albumId = response.albumInfo.id;
      this.trackNameArtist = response.song.artists[0].name;
      this.trackName = response.song.name;
      this.trackType = response.song.type;
      this.trackImage = response.song.album.images[0].url;
      this.colorDominante(this.trackImage);
      this.trackPopularity = response.song.popularity;
      this.trackDuration = response.song.duration_ms;
      this.trackReleaseDate = response.song.album.release_date;

      this.trackRecomList = response.recommendations.tracks.slice(0, 5);

      if (response.artistTracks) {
          this.trackArtistList = response.artistTracks[0].tracks.slice(0, 5)  
      }

      if (response.artistsAlbums.length > 1) {
        this.albumList = response.artistsAlbums[0].items
        this.albumListTwo = response.artistsAlbums[1].items

      } else {
        this.albumList = response.artistsAlbums[0].items
      }

      if ( response.artistRelated ) {
        this.artistSimilarList = response.artistRelated[0].artists;
      }

      this.albumType = response.albumInfo.album_type;
      this.albumTrack = response.albumInfo.name;
      this.albumImgTrack = response.albumInfo.images[0].url;
      this.albumTracksRelease = response.albumInfo.release_date;

      this.albumTrackList = response.albumInfo.tracks.items;

      this.loadingService.setLoading(false)
      this.loading = false;
      this.buscar = true;
    });
  }

  //Zona de Reproducción
  stopMusic() {
    this.musicPlayer.stopMusic();
  }

  // togglePlayBack(previewUrl: string) {
  //   this.musicPlayer.togglePlayBack(previewUrl);
  // }

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
          this.colorDominanteTrack.push(colore);
        }
      })
      .catch(error => {
        console.error('Error al obtener el color dominante', error);
      })
  }
}



