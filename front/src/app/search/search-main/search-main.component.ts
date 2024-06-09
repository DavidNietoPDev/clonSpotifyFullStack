import { Component, OnInit, inject } from '@angular/core';
import { SearchServiceService } from '../../services/search-service.service';
import { SearchBarService } from '../../services/search-bar.service';
import { MusicPlayerService } from '../../services/music-player.service';
import { LoadingService } from '../../services/loading.service';
import { TakeIdsService } from '../../services/take-ids.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { All } from '../../models/artist.model';

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrl: './search-main.component.css'
})

export class SearchMainComponent implements OnInit {
  searchService = inject(SearchServiceService)
  artistSearch = inject(SearchBarService)
  mediaPlayer = inject(MusicPlayerService)
  loadingService = inject(LoadingService)
  takeIdPlaylist = inject(TakeIdsService)
  route = inject(ActivatedRoute)
  constructor(private router: Router) { }

  
  routeSubscription: Subscription;
  searchSubscription: Subscription;
  artistName: string = '';
  buscar: boolean = false;
  globalVolume: number = 0.1;

  artistSonList: any [] = [];


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

  changeTerm(nameCategory: string) {
    this.searchService.setSearchTerm(nameCategory)
  }

  ngOnInit(){
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const term = params.get('search');
      if (term) {
        this.artistName = term;
        this.searchService.setSearchTerm(term);
        this.searchMethod()
      }
    });

    this.searchSubscription = this.searchService.searchTerm$.subscribe(data => {
      const { id, term } = data;
      this.artistName = term || ''; // Actualizar el valor del input
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

  searchMethod(): void {

      this.loadingService.setLoading(true);
      this.artistSearch.getArtistAll().subscribe((response: All) => {
        this.buscar = true;

        this.idArtistTracks = [];
        this.idArtistTracksTwo = [];
        this.idArtists = [];

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

        this.artistSonList = [];
        
        this.topAlbumImage = [];
        this.idsAlbum = [];
        this.topAlbumArtist = [];
        this.topAlbumYear = [];
        
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

        this.artistSonList = response.artists.items

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
      this.loadingService.setLoading(false);
      });
    } 
  // }

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
