import { Component, OnInit, inject } from '@angular/core';
import { SearchBarService } from '../../../services/search-bar.service';
import { TakeIdsService } from '../../../services/take-ids.service';
import { MusicPlayerService } from '../../../services/music-player.service';
import { AlbumID } from '../../../models/albumId.model';

@Component({
  selector: 'app-album-direct',
  templateUrl: './album-direct.component.html',
  styleUrl: './album-direct.component.css'
})
export class AlbumDirectComponent  implements OnInit  {

  playListSearch = inject(SearchBarService)
  takeId = inject(TakeIdsService)
  musicPlayer = inject(MusicPlayerService)

  buscar: boolean = false;
  loading: boolean = false;
  globalVolume: number = 0.1;
  albumId: string = this.takeId.getAlgoId();

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
    this.buscarAlbum();
  }

  takeIdAll (id: string) {
    this.takeId.setAlgoId(id);
  }

  buscarAlbum(): void {
    this.loading = true;
    this.playListSearch.getAlbumId(this.albumId).subscribe((response: AlbumID) => {
      this.trackUrl = [];
      this.tracksList = [];
      this.tracksDuration = [];
      this.tracksArtist = [];
      this.trackArtistTwo = [];
      this.idArtistTracks = [];
      this.idArtistTracksTwo = [];
      this.trackId = [];

      this.albumArtists = [];

      this.releaseDate = response.release_date;
      this.typeAlbum = response.album_type;
      this.listImage = response.images[0].url;
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
  

  


