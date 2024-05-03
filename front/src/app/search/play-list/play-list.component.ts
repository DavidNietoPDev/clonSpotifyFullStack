import { Component, OnInit, inject } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { PlayList } from '../../models/playlist.model';
import { TakeIdsService } from '../../services/take-ids.service';
import { MusicPlayerService } from '../../services/music-player.service';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrl: './play-list.component.css'
})
export class PlayListComponent implements OnInit {
  playListSearch = inject(SearchBarService)
  takeId = inject(TakeIdsService)
  musicPlayer = inject(MusicPlayerService)

  buscar: boolean = false;
  loading: boolean = false;
  globalVolume: number = 0.1;
  playListId: string = this.takeId.getAlgoId();

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
  listDescription : string [] = [];
  listFollowers: number = 0;
  listImage: string = '';


  takeIdAll(id: string) {
    this.takeId.setAlgoId(id);
    this.playListId = id;
  }

  ngOnInit(): void {
    this.buscarPlayList();
  } 

  buscarPlayList(): void {
    this.loading = true;

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

    this.listDescription = [];

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
        this.listName = response.name;
        if(response.description && response.description.length > 0) {
          this.listDescription.push(response.description[0]);
        } else {
          this.listDescription.push('');
        }
        if(response.followers && response.followers.total > 0) {
          this.listFollowers = response.followers.total;
        } else {
          this.listFollowers = response.tracks.total;
        }
        this.listImage = response.images[0].url
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
}


