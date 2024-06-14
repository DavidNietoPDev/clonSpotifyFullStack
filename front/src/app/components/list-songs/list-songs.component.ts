import { Component, Input, inject } from '@angular/core';
import { MusicPlayerService } from '../../services/music-player.service';
import { Item } from '../../models/tracks.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TakeIdsService } from '../../services/take-ids.service';

@Component({
  selector: 'app-list-songs',
  templateUrl: './list-songs.component.html',
  styleUrl: './list-songs.component.css'
})
export class ListSongsComponent {
  musicPlayer = inject(MusicPlayerService)
  router = inject(Router)
  contServ = inject(TakeIdsService)
  loadingSub: Subscription;
  indexListTwo: number = 5;
  indexListThree: number = 10;
  topTrackListOne: any[] = [];
  topTrackListTwo: any[] = [];
  topTrackListThree: any[] = [];
  _topTrackList: any[] = [];
  currentIndex: number = -1;
  currentIndexSubscription: Subscription;

  @Input()
  set topTrackList(value: Item[]) {
    this._topTrackList = value;
    this.listMethod();
  }
  get topTrackList(): any[] {
    return this._topTrackList;
  }

  hoveredIndex: number | null = null;
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

  loading: boolean = true;
  search: boolean = false;

  ngOnInit() {
    this.currentIndexSubscription = this.musicPlayer.currentIndex$.subscribe(index => {
      this.currentIndex = index;
    });
  }

  ngOnDestroy() {
    if (this.currentIndexSubscription) {
      this.currentIndexSubscription.unsubscribe();
    }
    this.contServ.clearCont()
    this.musicPlayer.clearSongs();
  }

  onMouseOver(index: number): void {
    this.hoveredIndex = index;
  }

  onMouseLeave(): void {
    this.hoveredIndex = null;
  }

  checkRoute(): boolean {
    return this.router.url.startsWith('/albumDirect/')
  }

  checkComponent(): boolean {
    if (this.router.url.startsWith('/songsId/') || this.router.url.startsWith('/artistId/'))
      return true;
  }

  listMethod() {
    this.loading = true;

    this.topTrackListOne = [];
    this.topTrackListTwo = [];
    this.topTrackListThree = [];
    this.topTrackAlbumId = [];
    this.topTrackId = [];
    this.topTrackAlbum = [];
    this.topTrackArtistImage = [];
    this.topTrack = [];
    this.topTrackUrlSong = [];
    this.topTrackDuration = [];
    this.topTrackArtist = [];
    this.topTrackArtistId = [];
    this.topTrackArtistTwo = [];
    this.topTrackArtistTwoId = [];

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
        this.topTrackAlbum.push(track.album.name);
      } else {
        this.topTrackAlbum.push('');
      }

      if (track && track.album && track.album.images && track.album.images.length > 0) {
        this.topTrackArtistImage.push(track.album.images[0].url);
      } else {
        this.topTrackArtistImage.push('');
      }

      if (track && track.name && track.name.length > 0) {
        this.topTrack.push(track.name);
      } else {
        this.topTrack.push('');
      }

      if (track && track.preview_url && track.preview_url.length > 0) {
        this.topTrackUrlSong.push(track.preview_url);
      } else {
        this.topTrackUrlSong.push('');
      }

      if (track && track.duration_ms) {
        this.topTrackDuration.push(track.duration_ms);
      } else {
        this.topTrackDuration.push(0);
      }

      if (track && track.artists && track.artists[0].name) {
        this.topTrackArtist.push(track.artists[0].name);
      } else {
        this.topTrackArtist.push('');
      }

      if (track && track.artists && track.artists[0].id) {
        this.topTrackArtistId.push(track.artists[0].id);
      }

      if (track && track.artists && track.artists.length > 1) {
        this.topTrackArtistTwo.push(track.artists[1].name);
        this.topTrackArtistTwoId.push(track.artists[1].id);
      } else {
        this.topTrackArtistTwo.push('');
        this.topTrackArtistTwoId.push('');
      }
    }

    // mapea las canciones con los datos trackdetails que necesita el reproductor
    
    if (this.contServ.getCont() === 0) {
      this.topTrackListOne = this.topTrackList
      const songs = this.topTrackListOne.map((track, index) => ({
        title: this.topTrack[index],
        artist: this.topTrackArtist[index],
        duration: 30,
        url: this.topTrackUrlSong[index],
        albumArt: this.topTrackArtistImage[index]
      }));

      this.musicPlayer.setSongs(songs);  //Agrega las canciones a la lista
      
      this.search = true;
      this.loading = false;
      this.contServ.setCont()

    } else if(this.contServ.getCont() === 1) {
      this.topTrackListTwo = this.topTrackList;
      
      const songs = this.topTrackListTwo.map((track, index) => {
        const customIndex = this.indexListTwo + index; // Ajustar el índice para que comience desde startIndex
        return {
        title: this.topTrack[index],
        artist: this.topTrackArtist[index],
        duration: 30,
        url: this.topTrackUrlSong[index],
        albumArt: this.topTrackArtistImage[index],
        index: customIndex
        }
      });
      this.musicPlayer.setSongs(songs);  //Agrega las canciones a la lista

      this.search = true;
      this.loading = false;
      this.contServ.setCont()

    } else {
      this.topTrackListThree = this.topTrackList
      const songs = this.topTrackListThree.map((track, index) => {
        const customIndex = this.indexListThree + index; // Ajustar el índice para que comience desde startIndex
        return {
        title: this.topTrack[index],
        artist: this.topTrackArtist[index],
        duration: 30,
        url: this.topTrackUrlSong[index],
        albumArt: this.topTrackArtistImage[index],
        index: customIndex
        }
      });

      this.musicPlayer.setSongs(songs);  //Agrega las canciones a la lista

      this.search = true;
      this.loading = false;

    }
    
  }

  playTrack(index: number) {
    this.currentIndex = index;
    this.musicPlayer.setCurrentIndex(index);
    this.musicPlayer.playTrack(index);
  }

}



