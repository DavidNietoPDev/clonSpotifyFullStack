import { Component, OnInit, inject } from '@angular/core';
import { SearchBarService } from '../../../services/search-bar.service';
import { TakeIdsService } from '../../../services/take-ids.service';
import { MusicPlayerService } from '../../../services/music-player.service';
import { ArtistID } from '../../../models/artistId.model';
import { ExtractColorService } from '../../../services/extract-color.service';
import { LoadingService } from '../../../services/loading.service';


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
  extractColor = inject(ExtractColorService)


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

  releaseDate: string[] = [];
  typeAlbum: string[] = [];
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
    this.loadingService.setLoading(true)

    this.colorDominanteArtist = [];
    this.nameAlbum = [];
    this.imageAlbum = [];
    this.artistGenres = [];
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
      this.artistType = response.artistInfo.type;
      this.artistFollowers = response.artistInfo.followers.total;
      this.artistImage = response.artistInfo.images[0].url;
      this.artistPopularity = response.artistInfo.popularity;
      this.artistGenres = response.artistInfo.genres;
      this.colorDominante(this.artistImage);

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


  //función para extraer el color de la imagen

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


