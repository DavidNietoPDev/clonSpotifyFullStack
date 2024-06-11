import { Component, OnInit, inject } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { TakeIdsService } from '../../services/take-ids.service';
import { ExtractColorService } from '../../services/extract-color.service';
import { Category, TracksItem } from '../../models/categry.model';
import { SearchServiceService } from '../../services/search-service.service';
import { LoadingService } from '../../services/loading.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../models/categories.model';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  searchTerm = inject(SearchServiceService)
  categoriesSearch = inject(SearchBarService)
  takeIdAll = inject(TakeIdsService)
  loadingService = inject(LoadingService)
  extractColor = inject(ExtractColorService)
  route = inject(ActivatedRoute)
  
  subscription: Subscription;

  loading: boolean = false;
  buscar: boolean = false;
  colorDominanteCategory: number [] = [];

  categoryId: string = this.takeIdAll.getAlgoId()
  termName: string = this.searchTerm.getTermName();
  imageCategory: string = '';
  nameCategory: string = '';

  topTrackList: TracksItem [] = [];

  listAlbum: any [] = [];
  // topAlbum: string[] = [];
  // topAlbumImage: string[] = [];
  // topAlbumArtist: string[] = [];
  // topAlbumYear: string[] = [];
  // idsAlbum: string[] = [];
  // idsArtistAlbum: string[] = [];

  listPlayList: any [] = [];
  // idsPlaylist: string[] = [];
  // playListAutor: string[] = [];
  // playListImage: string[] = [];
  // playListName: string[] = [];

  listArtist: any [] = [];
  // idArtists: string [] = [];
  // nameArtists: string[] = [];
  // imageArtists: string[] = [];

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      const id = params.get('Id');
      const term = params.get('search')
      if (id && term) {
        this.categoryId = id;
        // this.searchTerm.setTermName(term)
        this.searchTerm.setSearchTerm(id, term);
        this.buscarCategories(); // Realiza la búsqueda inicial
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  takeId(id: string) {
    this.takeIdAll.setAlgoId(id);
  }

  buscarCategories() {
    this.loadingService.setLoading(true)
    this.loading = true;
    this.buscar = true;

    this.colorDominanteCategory = [];

    this.listAlbum = [];
    this.listArtist = [];
    this.listPlayList = [];

    // this.idsPlaylist = [];
    // this.playListImage = [];
    // this.playListName = [];
    // this.playListAutor = [];

    // this.idArtists = [];
    // this.nameArtists = [];
    // this.imageArtists = [];

    // this.topAlbum = [];
    // this.topAlbumImage = [];
    // this.topAlbumArtist = [];
    // this.topAlbumYear = [];
    // this.idsAlbum = [];
    // this.idsArtistAlbum = [];

    this.categoriesSearch.getCategoryId(this.categoryId).subscribe((response: Category) => {
      this.imageCategory = response.categoryInfo.icons[0].url;
      this.colorDominante(this.imageCategory)
      this.nameCategory = response.categoryInfo.name;
      this.listPlayList = response.searchs.playlists.items
      // for (let playlist of response.searchs.playlists.items) 
      //   {
      //   this.idsPlaylist.push(playlist.id);
      //   this.playListImage.push(playlist.images[0].url);
      //   this.playListName.push(playlist.name)
      //   this.playListAutor.push(playlist.owner.display_name)
      //   }
      this.listArtist = response.searchs.artists.items
      // for (let artist of response.searchs.artists.items)
      //   {
      //     this.idArtists.push(artist.id);
      //     this.nameArtists.push(artist.name);
      //     if (artist.images && artist.images.length > 0) 
      //       {
      //         this.imageArtists.push(artist.images[0].url);
      //       } else {
      //         this.imageArtists.push('../../assets/Artistasinfoto.png');
      //       }
      //   }
      this.listAlbum = response.searchs.albums.items
      // for (let album of response.searchs.albums.items)
      //   {
      //     this.topAlbum.push(album.name)
      //     if(album.images && album.images.length > 1) {
      //       this.topAlbumImage.push(album.images[0].url);
      //     } else {
      //       this.topAlbumImage.push('../../assets/Artistasinfoto.png')
      //     }
      //     this.topAlbumArtist.push(album.artists[0].name)
      //     this.topAlbumYear.push(album.release_date) 
      //     this.idsAlbum.push(album.id); 
      //     this.idsArtistAlbum.push(album.artists[0].id)
      //   }
      for (let track of response.searchs.tracks.items.slice(0, 10))
        {
          this.topTrackList.push(track);
         }
        this.loadingService.setLoading(false)
        this.loading = false;     
    }); 
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
