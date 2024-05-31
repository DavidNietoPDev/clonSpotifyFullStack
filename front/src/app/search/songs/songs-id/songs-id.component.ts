import { Component, OnInit, inject } from '@angular/core';
import { SearchBarService } from '../../../services/search-bar.service';
import { TakeIdsService } from '../../../services/take-ids.service';
import { MusicPlayerService } from '../../../services/music-player.service';
import { TrackID } from '../../../models/trackId.model';
import { ExtractColorService } from '../../../services/extract-color.service';
@Component({
  selector: 'app-songs-id',
  templateUrl: './songs-id.component.html',
  styleUrl: './songs-id.component.css'
})
export class SongsIdComponent implements OnInit {

  playListSearch = inject(SearchBarService)
  takeId = inject(TakeIdsService)
  musicPlayer = inject(MusicPlayerService)
  extractColor = inject(ExtractColorService)

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

  trackRecomImage: string[] = [];
  trackRecomName: string[] = [];
  trackRecomId: string[] = [];
  trackRecomDuration: number[] = [];
  trackRecomUrl: string[] = [];
  trackRecomArtists: string[] = [];
  trackRecomArtistsId: string[] = [];
  trackRecomArtistsTwoIds: string[] = [];
  trackRecomArtistsTwo: string[] = [];

  trackArtistImage: string[] = [];
  trackArtistName: string[] = [];
  trackArtistDuration: number[] = [];
  trackArtistUrl: string[] = [];
  trackArtistId: string[] = [];

  releaseDateArtist: string[] = [];
  typeAlbumArtist: string[] = [];
  nameAlbumArtist: string[] = [];
  imageAlbumArtist: string[] = [];
  idsAlbumArtist: string[] = [];

  releaseDateArtistTwo: string[] = [];
  typeAlbumArtistTwo: string[] = [];
  nameAlbumArtistTwo: string[] = [];
  imageAlbumArtistTwo: string[] = [];
  idsAlbumArtistTwo: string[] = [];

  artistSimilarImage: string[] = [];
  artistSimilarName: string[] = [];
  artistSimilarType: string[] = [];
  idArtistSimilar: string[] = [];

  albumId: string = '';
  albumTrack: string = '';
  albumType: string = '';
  albumImgTrack: string = '';
  albumTracksName: string[] = [];
  albumTracksPreviewUrl: string [] = [];
  albumTracksId: string[] = [];
  albumTracksArtist: string[] = [];
  albumTracksArtistTwo: string[] = [];
  albumTracksArtistId: string[] = [];
  albumTracksArtistTwoId: string[] = [];
  albumTracksDuration: number[] = [];
  albumTracksRelease: string = '';

  takeIdAll(id: string) {
    this.takeId.setAlgoId(id);
    this.songId = id;
  }

  ngOnInit(): void {
    this.buscarArtist();
  }

  buscarArtist(): void {
    this.loading = true;
    this.colorDominanteTrack = [];

    this.trackRecomImage = [];
    this.trackRecomId = [];
    this.trackRecomName = [];
    this.trackRecomDuration = [];
    this.trackRecomUrl = [];
    this.trackRecomArtists = [];
    this.trackRecomArtistsId = [];
    this.trackRecomArtistsTwo = [];
    this.trackRecomArtistsTwoIds = [];

    this.trackArtistImage = [];
    this.trackArtistName = [];
    this.trackArtistDuration = [];
    this.trackArtistUrl = [];
    this.trackArtistId = [];

    this.releaseDateArtist = [];
    this.typeAlbumArtist = [];
    this.nameAlbumArtist = [];
    this.imageAlbumArtist = [];
    this.idsAlbumArtist = [];

    this.releaseDateArtistTwo = [];
    this.typeAlbumArtistTwo = [];
    this.nameAlbumArtistTwo = [];
    this.imageAlbumArtistTwo = [];
    this.idsAlbumArtistTwo = [];

    this.artistSimilarImage = [];
    this.artistSimilarName = [];
    this.artistSimilarType = [];
    this.idArtistSimilar = [];

    this.albumTracksId = [];
    this.albumTracksName = [];
    this.albumTracksArtist = [];
    this.albumTracksPreviewUrl =  [];
    this.albumTracksArtistTwo = [];
    this.albumTracksArtistId = [];
    this.albumTracksArtistTwoId = [];
    this.albumTracksDuration = [];

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


      for (let track of response.recommendations.tracks) {
        this.trackRecomImage.push(track.album.images[0].url);
        this.trackRecomName.push(track.name);
        this.trackRecomDuration.push(track.duration_ms);
        this.trackRecomUrl.push(track.preview_url);
        this.trackRecomId.push(track.id);
        this.trackRecomArtists.push(track.artists[0].name)
        this.trackRecomArtistsId.push(track.artists[0].id);
        if (track.artists && track.artists.length > 1) {
          this.trackRecomArtistsTwo.push(track.artists[1].name)
          this.trackRecomArtistsTwoIds.push(track.artists[1].id);
        } else {
          this.trackRecomArtistsTwo.push('');
          this.trackRecomArtistsTwoIds.push('');
        }
      }

      if (response.artistTracks) {
        for (let track of response.artistTracks[0].tracks) {
          this.trackArtistImage.push(track.album.images[0].url)
          this.trackArtistName.push(track.name)
          this.trackArtistDuration.push(track.duration_ms)
          this.trackArtistUrl.push(track.preview_url)
          this.trackArtistId.push(track.id)
        }
      }

      if (response.artistsAlbums.length > 1) {
        for (let artist of response.artistsAlbums[0].items) {
          this.releaseDateArtist.push(artist.release_date)
          this.typeAlbumArtist.push(artist.album_type)
          this.nameAlbumArtist.push(artist.name)
          this.imageAlbumArtist.push(artist.images[0].url)
          this.idsAlbumArtist.push(artist.id) 
        }
        for (let artist of response.artistsAlbums[1].items) {
          this.releaseDateArtistTwo.push(artist.release_date);
          this.typeAlbumArtistTwo.push(artist.album_type);
          this.nameAlbumArtistTwo.push(artist.name);
          this.imageAlbumArtistTwo.push(artist.images[0].url);
          this.idsAlbumArtistTwo.push(artist.id); 
        }
      } else {
        for (let artist of response.artistsAlbums[0].items) {
          this.releaseDateArtist.push(artist.release_date)
          this.typeAlbumArtist.push(artist.album_type)
          this.nameAlbumArtist.push(artist.name)
          this.imageAlbumArtist.push(artist.images[0].url)
          this.idsAlbumArtist.push(artist.id)
        }
      }

      if ( response.artistRelated ) {
        for( let artist of response.artistRelated[0].artists) {
          this.artistSimilarImage.push(artist.images[0].url);
          this.artistSimilarName.push(artist.name);
          this.artistSimilarType.push(artist.type);
          this.idArtistSimilar.push(artist.id); 
        }
      }

      this.albumType = response.albumInfo.album_type;
      this.albumTrack = response.albumInfo.name;
      this.albumImgTrack = response.albumInfo.images[0].url;
      this.albumTracksRelease = response.albumInfo.release_date;
      for (let track of response.albumInfo.tracks.items) {
        this.albumTracksId.push(track.id);
        this.albumTracksName.push(track.name);
        this.albumTracksPreviewUrl.push(track.preview_url);
        this.albumTracksArtist.push(track.artists[0].name);
        this.albumTracksArtistId.push(track.artists[0].id);
        this.albumTracksDuration.push(track.duration_ms);
        if(track.artists && track.artists.length > 1) {
          this.albumTracksArtistTwo.push(track.artists[1].name);
          this.albumTracksArtistTwoId.push(track.artists[1].id);
        } else {
          this.albumTracksArtistTwo.push('');
          this.albumTracksArtistTwoId.push('');
        }
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



