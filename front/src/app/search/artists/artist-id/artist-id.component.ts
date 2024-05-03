import { Component, OnInit, inject } from '@angular/core';
import { SearchBarService } from '../../../services/search-bar.service';
import { TakeIdsService } from '../../../services/take-ids.service';
import { MusicPlayerService } from '../../../services/music-player.service';
import { ArtistID } from '../../../models/artistId.model';

@Component({
  selector: 'app-artist-id',
  templateUrl: './artist-id.component.html',
  styleUrl: './artist-id.component.css'
})
export class ArtistIdComponent implements OnInit {
  playListSearch = inject(SearchBarService)
  takeId = inject(TakeIdsService)
  musicPlayer = inject(MusicPlayerService)

  buscar: boolean = false;
  loading: boolean = false;
  globalVolume: number = 0.1;
  artistId: string = this.takeId.getAlgoId();

  artistName: string = '';
  artistImage: string = '';
  artistFollowers: number = 0;
  artistPopularity: number = 0;

  releaseDate:string [] = [];
  typeAlbum: string [] = [];
  nameAlbum: string[] = [];
  imageAlbum: string[] = [];
  idsAlbum: string[] = [];

  trackId: string[] = [];
  trackImage: string[] = [];
  trackName: string[] = [];
  trackDuration: number[] = [];
  trackUrl: string[] = [];

  artistSimilarImage: string[] = [];
  artistSimilarName: string[] = [];
  artistSimilarType: string[] = [];
  idArtistSimilar: string[] = [];

  takeIdAll(id: string) {
    this.takeId.setAlgoId(id);
    this.artistId = id;
  }

  ngOnInit(): void {
    this.buscarArtist();
  }

  buscarArtist(): void {
    this.loading = true;

    this.nameAlbum = [];
    this.imageAlbum = [];
    this.releaseDate = [];
    this.typeAlbum = [];
    this.idsAlbum = [];

    this.trackId = [];
    this.trackUrl = [];
    this.trackDuration = [];
    this.trackName = [];
    this.trackImage = [];

    this.artistSimilarImage = [];
    this.artistSimilarType = [];
    this.artistSimilarName = [];
    this.idArtistSimilar = [];

    this.playListSearch.getArtistId(this.artistId).subscribe((response: ArtistID) => {
      this.artistName = response.artistInfo.name;
      this.artistFollowers = response.artistInfo.followers.total;
      this.artistImage = response.artistInfo.images[0].url;
      this.artistPopularity = response.artistInfo.popularity;

      for (let album of response.albums.items) {
        this.releaseDate.push(album.release_date);
        this.typeAlbum.push(album.album_type);
        this.nameAlbum.push(album.name);
        this.imageAlbum.push(album.images[0].url);
        this.idsAlbum.push(album.id);
      }
      
      for (let track of response.topTracks.tracks) { 
        this.trackId.push(track.id);
        this.trackUrl.push(track.preview_url);
        this.trackDuration.push(track.duration_ms);
        this.trackName.push(track.name);
        this.trackImage.push(track.album.images[0].url);
      }

      for (let artist of response.relatedArtists.artists) {
        this.artistSimilarImage.push(artist.images[0].url);
        this.artistSimilarName.push(artist.name);
        this.artistSimilarType.push(artist.type);
        this.idArtistSimilar.push(artist.id);
      }
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
}
  

