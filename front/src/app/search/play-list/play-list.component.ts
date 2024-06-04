import { Component, OnInit, inject } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { PlayList } from '../../models/playlist.model';
import { TakeIdsService } from '../../services/take-ids.service';
import { MusicPlayerService } from '../../services/music-player.service';
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
  musicPlayer = inject(MusicPlayerService)
  loadingService = inject(LoadingService)
  extractColor = inject(ExtractColorService)
  searcherTerm = inject(SearchServiceService)
  route = inject(ActivatedRoute)
  subscription: Subscription;

  buscar: boolean = false;
  loading: boolean = false;
  globalVolume: number = 0.1;
  playListId: string = this.takeId.getAlgoId();
  colorDominantePlayList: number[] = [];

  trackUrl: string[] = [];
  tracksList: string[] = [];
  tracksImages: string[] = [];
  tracksArtist: string[] = [];
  tracksAlbum: string[] = [];
  tracksDuration: number[] = [];

  albumId: string[] = [];
  trackArtistId: string[] = [];
  trackArtistTwoId: string[] = [];
  trackArtistTwo: string[] = [];
  artistId: string[] = [];

  listName: string = '';
  numberSongs: number = 0;
  listDescription: string = '';
  listFollowers: number = 0;
  listImage: string = '';
  listType: string = '';


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
    this.colorDominantePlayList = [];

    this.trackUrl = [];
    this.tracksList = [];
    this.tracksImages = [];
    this.tracksArtist = [];
    this.tracksAlbum = [];
    this.tracksDuration = [];

    this.albumId = [];
    this.trackArtistId = [];
    this.trackArtistTwoId = [];
    this.trackArtistTwo = [];
    this.trackArtistId = [];
    this.artistId = [];


    this.playListSearch.getPlayList(this.playListId).subscribe((response: PlayList) => {
      for (let track of response.tracks.items) {
        if (track.track && track.track.album && track.track.album.id) {
          this.albumId.push(track.track.album.id);
        } else {
          this.albumId.push('');
        }
        if (track.track && track.track.id) {
          this.artistId.push(track.track.id);
        } else {
          this.artistId.push('');
        }
        this.numberSongs = response.tracks.total
        this.listType = response.type;
        this.listName = response.name;
        if (response.description && response.description.length > 0) {
          this.listDescription = (response.description);
        } else {
          this.listDescription = ('');
        }
        if (response.followers && response.followers.total > 0) {
          this.listFollowers = response.followers.total;
        } else {
          this.listFollowers = response.tracks.total;
        }

        this.listImage = response.images[0].url
        this.colorDominante(this.listImage);

        if (track && track.track) {
          if (track.track.preview_url && track.track.preview_url.length > 0) {
            this.trackUrl.push(track.track.preview_url)
          } else {
            this.trackUrl.push('')
          }
          if (track.track.duration_ms) {
            this.tracksDuration.push(track.track.duration_ms)
          } else {
            this.tracksDuration.push(0)
          }

          this.tracksAlbum.push(track.track.album.name);
          if (track.track.album.images && track.track.album.images.length > 0) {
            this.tracksImages.push(track.track.album.images[0].url)
          } else {
            this.tracksImages.push('../../assets/Artistasinfoto.png')
          }
          if (track.track && track.track.name.length > 0) {
            this.tracksList.push(track.track.name);
          } else {
            this.tracksList.push('Desconocido')
          }
          this.tracksArtist.push(track.track.artists[0].name)
          this.trackArtistId.push(track.track.artists[0].id)
          if (track.track.artists && track.track.artists.length > 1) {
            this.trackArtistTwo.push(track.track.artists[1].name)
            this.trackArtistTwoId.push(track.track.artists[1].id)
          } else {
            this.trackArtistTwo.push('');
            this.trackArtistTwoId.push('');
          }
        }
      }
      this.loadingService.setLoading(false)
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
          this.colorDominantePlayList.push(colore);
        }
      })
      .catch(error => {
        console.error('Error al obtener el color dominante', error);
      })
  }
}


