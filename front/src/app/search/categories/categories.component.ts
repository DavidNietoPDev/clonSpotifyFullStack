import { Component, OnInit, inject } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { TakeIdsService } from '../../services/take-ids.service';
import { ExtractColorService } from '../../services/extract-color.service';
import { Category } from '../../models/categry.model';
import { SearchServiceService } from '../../services/search-service.service';
import { MusicPlayerService } from '../../services/music-player.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  searchTerm = inject(SearchServiceService)
  categoriesSearch = inject(SearchBarService)
  takeIdAll = inject(TakeIdsService)
  extractColor = inject(ExtractColorService)
  musicPlayer = inject(MusicPlayerService)

  globalVolume: number = 0.1;
  loading: boolean = false;
  buscar: boolean = false;
  colorDominanteCategory: number [] = [];

  categoryId: string = this.takeIdAll.getAlgoId()
  imageCategory: string = '';
  nameCategory: string = '';



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
  idsArtistAlbum: string[] = [];


  idsPlaylist: string[] = [];
  playListAutor: string[] = [];
  playListImage: string[] = [];
  playListName: string[] = [];

  idArtists: string [] = [];
  nameArtists: string[] = [];
  imageArtists: string[] = [];

  ngOnInit(): void {
    this.buscarCategories();
  }


  takeId(id: string) {
    this.takeIdAll.setAlgoId(id);
  }

  buscarCategories() {
    
    this.loading = true;
    this.buscar = true;

    this.colorDominanteCategory = [];

    this.idsPlaylist = [];
    this.playListImage = [];
    this.playListName = [];
    this.playListAutor = [];

    this.idArtists = [];
    this.nameArtists = [];
    this.imageArtists = [];

    this.topAlbum = [];
    this.topAlbumImage = [];
    this.topAlbumArtist = [];
    this.topAlbumYear = [];
    this.idsAlbum = [];
    this.idsArtistAlbum = [];

    this.topTrackArtistTwo = [];
    this.idArtistTracksTwo = [];
    this.topTrackArtist = [];
    this.idArtistTracks = [];
    this.topTrackId = [];
    this.topTrackArtistImage = [];
    this.topTrackUrl = [];
    this.topTrack = [];
    this.topTrackDuration = [];

    this.categoriesSearch.getCategoryId(this.categoryId).subscribe((response: Category) => {
      this.imageCategory = response.categoryInfo.icons[0].url;
      this.colorDominante(this.imageCategory)
      this.nameCategory = response.categoryInfo.name;
      for (let playlist of response.searchs.playlists.items) 
        {
        this.idsPlaylist.push(playlist.id);
        this.playListImage.push(playlist.images[0].url);
        this.playListName.push(playlist.name)
        this.playListAutor.push(playlist.owner.display_name)
        }
      for (let artist of response.searchs.artists.items)
        {
          this.idArtists.push(artist.id);
          this.nameArtists.push(artist.name);
          if (artist.images && artist.images.length > 0) 
            {
              this.imageArtists.push(artist.images[0].url);
            } else {
              this.imageArtists.push('../../assets/Artistasinfoto.png');
            }
          
        }
      for (let album of response.searchs.albums.items)
        {
          this.topAlbum.push(album.name) 
          this.topAlbumImage.push(album.images[0].url);
          this.topAlbumArtist.push(album.artists[0].name)
          this.topAlbumYear.push(album.release_date) 
          this.idsAlbum.push(album.id); 
          this.idsArtistAlbum.push(album.artists[0].id)
        }
      for (let track of response.searchs.tracks.items)
        {
          if(track.artists && track.artists.length > 1) 
            {
              this.topTrackArtistTwo.push(track.artists[1].name)
              this.idArtistTracksTwo.push(track.artists[1].id)
            } else {
              this.idArtistTracksTwo.push('')
              this.topTrackArtistTwo.push('')
            }
          this.topTrackArtist.push(track.artists[0].name)
          this.idArtistTracks.push(track.artists[0].id)
          this.topTrackId.push(track.id)
          this.topTrackArtistImage.push(track.album.images[0].url)
          this.topTrackUrl.push(track.preview_url)
          this.topTrack.push(track.name)
          this.topTrackDuration.push(track.duration_ms)

        }
        
    })
    this.loading = false;
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


  async colorDominante(imageUrl: string) {
    this.extractColor.getColorDominante(imageUrl)
      .then(color => {
        for (let colore of color) {
          this.colorDominanteCategory.push(colore);
        }
      })
      .catch(error => {
        console.error('Error al obtener el color dominante', error);
      })
  }
}
