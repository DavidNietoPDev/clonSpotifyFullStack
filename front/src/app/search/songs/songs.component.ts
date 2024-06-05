import { Component, OnInit, inject } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { Track } from '../../models/tracks.model';
import { SearchServiceService } from '../../services/search-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicPlayerService } from '../../services/music-player.service';
import { TakeIdsService } from '../../services/take-ids.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.css'
})

export class SongsComponent implements OnInit {
  artistSearch = inject(SearchBarService);
  searchService = inject(SearchServiceService);
  route = inject(ActivatedRoute);
  loadingService = inject(LoadingService)
  musicPlayer = inject(MusicPlayerService)
  takeId = inject(TakeIdsService)
  constructor(private router: Router) { }


  // @ViewChild('buttonSongs') buttonSongs: ElementRef;
  artistNameSongs: string = '';

  routeSubscription: Subscription;
  searchSubscription: Subscription;

  topTrackArtistId: string[] = [];
  topTrackArtistTwoId: string[] = [];
  topTrackArtist: string[] = [];
  topTrackArtistTwo: string[] = [];

  topTrackId: string[] = [];
  topTrack: string[] = [];
  topTrackArtistImage: string[] = [];
  topTrackDuration: number[] = [];
  topTrackUrlSong: string[] = [];
  

  topTrackAlbum: string[] = [];
  topTrackAlbumId: string[] = [];


  nameTrack: string = '';
  nameArtist: string = '';
  loading: boolean = false;
  buscar: boolean = false;
  globalVolume: number = 0.1;

  ngOnInit(){
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const term = params.get('search');
      if (term) {
        this.artistNameSongs = term;
        this.searchService.setSearchTerm(term);
        this.searchMethod()
      }
    });

    this.searchSubscription = this.searchService.searchTerm$.subscribe(data => {
      const { id, term } = data;
      this.artistNameSongs = term || ''; // Actualizar el valor del input
    });
  }

  ngOnDestroy() {
    // Desuscribirse para evitar fugas de memoria
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  takeIdAll(id: string) {
    this.takeId.setAlgoId(id);
  }

  searchMethod(): void {
    this.stopMusic();
    // if (!this.searchTerm.checkTerm(this.artistNameSongs)) {
    //   console.error('Introduce un artista')
    // } else {
      this.loadingService.setLoading(true);
      this.loading = true;
      this.artistSearch.getArtistTopTracks().subscribe((response: Track) => {

        this.topTrackId = [];
        this.topTrackArtistId = [];
        this.topTrackArtistTwoId = [];
        this.topTrackArtistTwo = [];
        this.topTrackArtist = [];

        this.topTrack = [];
        this.topTrackArtistImage = [];
        this.topTrackDuration = [];
        this.topTrackUrlSong = [];

        this.topTrackAlbum = [];
        this.topTrackAlbumId = [];

        this.buscar = true;
        for (let track of response.tracks.items) {
          this.topTrackId.push(track.id);

          this.topTrackAlbumId.push(track.album.id)
          this.topTrackAlbum.push(track.album.name)

          this.topTrackUrlSong.push(track.preview_url)
          this.topTrack.push(track.name);
          this.topTrackArtistImage.push(track.album.images[0].url)
          this.topTrackDuration.push(track.duration_ms)

          this.topTrackArtist.push(track.artists[0].name);
          this.topTrackArtistId.push(track.artists[0].id);

          if (track.artists && track.artists.length > 1) {
            this.topTrackArtistTwo.push(track.artists[1].name);
            this.topTrackArtistTwoId.push(track.artists[1].id)
        } else {
            this.topTrackArtistTwo.push('');
            this.topTrackArtistTwoId.push('');
        }
        }
        this.loading = false;
        this.loadingService.setLoading(false);
      });
    }
  // }

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
}
