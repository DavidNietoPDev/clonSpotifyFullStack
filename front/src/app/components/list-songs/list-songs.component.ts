import { Component, Input, inject } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { MusicPlayerService } from '../../services/music-player.service';
import { Item } from '../../models/tracks.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-songs',
  templateUrl: './list-songs.component.html',
  styleUrl: './list-songs.component.css'
})
export class ListSongsComponent {
  loadingService = inject(LoadingService)
  musicPlayer = inject(MusicPlayerService)
  router = inject(Router)
  loadingSub: Subscription;

  @Input() topTrackList: Item[] = [];

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

  loading: boolean = false;
  search: boolean = false;
  globalVolume: number = 0.1;

  ngOnInit() {
    this.loadingSub = this.loadingService.isLoading$().subscribe(state => {
      this.loading = state; 
    });
    if(this.topTrackList){
      this.listMethod()
    }
  }


  ngOnDestroy() {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }

  checkRoute(): boolean {
    return this.router.url.startsWith('/albumDirect/')
  }

  listMethod() {
    setTimeout(() => {
      this.stopMusic();
      this.search = true;
      if (this.topTrackList) {
        for (let track of this.topTrackList) {
          if (track && track.album && track.album.id) {
            this.topTrackAlbumId.push(track.album.id);
          } else {
            this.topTrackAlbumId.push('');
          }
          if (track && track.id) {
            this.topTrackId.push(track.id);
          } else {
            this.topTrackId.push('');
          }
          if (track && track.album && track.album.name) {
            this.topTrackAlbum.push(track.album.name)
          } else {
            this.topTrackAlbum.push('')
          }
  
          if (track && track.album && track.album.images && track.album.images.length > 1) {
            this.topTrackArtistImage.push(track.album.images[0].url)
          } else {
            this.topTrackArtistImage.push('../../assets/Artistasinfoto.png')
          }
          if (track && track.name && track.name.length > 0) {
            this.topTrack.push(track.name);
          } else {
            this.topTrack.push('Unknown')
          }
          if (track && track.preview_url && track.preview_url.length > 0) {
            this.topTrackUrlSong.push(track.preview_url)
          } else {
            this.topTrackUrlSong.push('')
          }
          if (track && track.duration_ms) {
            this.topTrackDuration.push(track.duration_ms)
          } else {
            this.topTrackDuration.push(0)
          }
          if (track && track.artists && track.artists[0].name) {
            this.topTrackArtist.push(track.artists[0].name);
          } else {
            this.topTrackArtist.push('Unknown')
          }
  
          if (track && track.artists && track.artists[0].id) {
            this.topTrackArtistId.push(track.artists[0].id);
          }
  
          if (track && track.artists && track.artists.length > 1) {
            this.topTrackArtistTwo.push(track.artists[1].name);
            this.topTrackArtistTwoId.push(track.artists[1].id)
          } else {
            this.topTrackArtistTwo.push('');
            this.topTrackArtistTwoId.push('');
          }
        }
      }
      this.loadingService.setLoading(false);
      this.loading = false;
    }, 2000)
  
  };


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



