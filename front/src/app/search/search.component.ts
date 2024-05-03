import { Component, OnInit, inject } from '@angular/core';
import { SearchBarService } from '../services/search-bar.service';
import { All } from '../models/artist.model';
import { SearchServiceService } from '../services/search-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TakeIdsService } from '../services/take-ids.service';
import { MusicPlayerService } from '../services/music-player.service';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})


export class SearchComponent implements OnInit {
  searchTerm = inject(SearchServiceService)
  artistSearch = inject(SearchBarService)
  mediaPlayer = inject(MusicPlayerService)
  takeIdPlaylist = inject(TakeIdsService)
  route = inject(ActivatedRoute)
  constructor(private router: Router) { }

  artistName: string = this.searchTerm.getSearchTerm();
  loading: boolean = false;
  buscar: boolean = false;
  globalVolume: number = 0.1;

  displayedTracks: any[] = [];
  imageSimilar: string[] = [];
  artistSimilarList: string[] = [];
  artistSimilarId: string [] = []; 
  topTrackId: string[] = [];
  topTrackUrl: string[] = [];
  topTrack: string[] = [];
  topTrackDuration: number[] = [];
  topTrackArtist: string[] = [];
  topTrackArtistTwo: string[] = [];
  topTrackArtistImage: string[] = [];
  idArtistTracks: string [] = [];
  idArtistTracksTwo: string [] = [];
  topAlbum: string[] = [];
  topAlbumImage: string[] = [];
  topAlbumArtist: string[] = [];
  topAlbumYear: string[] = [];
  idsAlbum: string[] = [];
  idsPlaylist: string[] = [];
  playList: string[] = [];
  playListImage: string[] = [];
  playListName: string[] = [];
  idArtists: string [] = [];
  idArtist: string = '';
  imageUrl: string = '';
  artist: any;

  takeId(id: string) {
    this.takeIdPlaylist.setAlgoId(id);
  }
  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params.fromSongsComponent || params.fromArtistsComponent || params.fromAlbumsComponent) {
        this.buscarArtista();
      }
    });
  }

  navegarAComponenteSongs() {
    // Navegar a SongsComponent y pasar un parámetro indicando que proviene de SearchComponent
    this.router.navigate(['/songs'], { queryParams: { fromSearchComponent: true } });
  }

  navegarAComponenteArtists() {
    this.router.navigate(['/artists'], { queryParams: { fromSearchComponent: true } });
  }

  navegarAComponenteAlbumes() {
    this.router.navigate(['/albums'], { queryParams: { fromSearchComponent: true } });
  }

  buscarArtista(): void {
    this.loading = true;
    if (!this.searchTerm.checkTerm(this.artistName)) {
      console.error('Introduce un artista')
      this.loading = false;
    } else {
      this.artistSearch.getArtistAll().subscribe((response: All) => {
        this.idArtistTracks = [];
        this.idArtistTracksTwo = [];
        this.idArtists = [];
        this.idsAlbum = [];
        this.idsPlaylist = [];
        this.playListName = [];
        this.playList = [];
        this.playListImage = [];
        this.topTrackId = [];
        this.topTrackArtist = [];
        this.topTrackArtistTwo = [];
        this.topTrackUrl = [];
        this.topTrack = [];
        this.topTrackDuration = [];
        this.topTrackArtistImage = [];
        this.artistSimilarId = [];
        this.imageSimilar = [];
        this.artistSimilarList = [];
        this.topAlbum = [];
        this.topAlbumImage = [];
        this.topAlbumArtist = [];
        this.topAlbumYear = [];
        this.buscar = true;
        this.idArtist = response.artists.items[0].id;
        this.artist = response.artists.items[0].name;
        this.imageUrl = response.artists.items[0].images[0].url;


        for (let album of response.albums.items) {
          this.idsAlbum.push(album.id);
          this.topAlbum.push(album.name)
          this.topAlbumYear.push(album.release_date)
          if (album.images && album.images.length > 0) {
            this.topAlbumImage.push(album.images[0].url); // Verifica si hay imágenes disponibles
          } else {
            // Si no hay imagen disponible, puedes agregar una imagen por defecto o dejar este espacio en blanco
            this.topAlbumImage.push('../assets/Artistasinfoto.png');
          }
          for (let artists of album.artists) {
            this.idArtists.push(artists.id);
            if (artists.name && artists.name.length > 0) {
              this.topAlbumArtist.push(artists.name);
            } else {
              this.topAlbumArtist.push('');
            }
          }
        }
        for (let similar of response.artists.items) {
          this.artistSimilarList.push(similar.name);
          this.artistSimilarId.push(similar.id);
          if (similar.images && similar.images.length > 0) {
            this.imageSimilar.push(similar.images[0].url); // Verifica si hay imágenes disponibles
          } else {
            // Si no hay imagen disponible, puedes agregar una imagen por defecto o dejar este espacio en blanco
            this.imageSimilar.push('../assets/Artistasinfoto.png');
          }
        }
        for (let tracks of response.tracks.items) {
          this.topTrackId.push(tracks.id)
          this.topTrackUrl.push(tracks.preview_url)
          this.topTrack.push(tracks.name)
          this.topTrackDuration.push(tracks.duration_ms)
          this.idArtistTracks.push(tracks.artists[0].id)
          this.topTrackArtist.push(tracks.artists[0].name);
          if (tracks.artists && tracks.artists.length > 1) {
            this.topTrackArtistTwo.push(tracks.artists[1].name);
            this.idArtistTracksTwo.push(tracks.artists[1].id)
        } else {
            this.topTrackArtistTwo.push('');
            this.idArtistTracksTwo.push('');
        }
          if (tracks.album.images && tracks.album.images.length > 0) {
            this.topTrackArtistImage.push(tracks.album.images[0].url);
          } else {
            // Si no hay imagen disponible, puedes agregar una imagen por defecto o dejar este espacio en blanco
            this.topTrackArtistImage.push('../assets/Artistasinfoto.png');
          }
        }

        for (let playList of response.playlists.items) {
          this.idsPlaylist.push(playList.id)
          this.playList.push(playList.name)
          if (playList.name) {
            this.playListName.push(playList.owner.display_name)
          } else {
            this.playListName.push('Desconocido')
          }
          if (playList.images && playList.images.length > 0) {
            this.playListImage.push(playList.images[0].url)
        } else {
          this.playListImage.push('../assets/Artistasinfoto.png');
        }
      }


        this.loading = false;
      });
    }
  }

  topMusic() {
    this.mediaPlayer.stopMusic();
  }


  togglePlayBack(previewUrl: string) {
    this.mediaPlayer.togglePlayBack(previewUrl);
  }

  setVolume(volume: number) {
    this.mediaPlayer.setVolume(volume);
  }
  
  ajustarVolume() {
    this.mediaPlayer.setVolume(this.globalVolume);
  }

}


