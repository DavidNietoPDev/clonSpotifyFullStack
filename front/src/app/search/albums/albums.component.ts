import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { SearchServiceService } from '../../services/search-service.service';
import { SearchBarService } from '../../services/search-bar.service';
import { Album } from '../../models/album.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TakeIdsService } from '../../services/take-ids.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent implements OnInit {
  @ViewChild('buttonAlbums') buttonAlbums: ElementRef;
  route = inject(ActivatedRoute)
  searchService = inject(SearchServiceService)
  loadingService = inject(LoadingService)
  artistSearch = inject(SearchBarService)
  takeIdAlbum = inject(TakeIdsService)
  constructor(private router: Router) { }

  routeSubscription: Subscription;
  searchSubscription: Subscription;
  artistNameArtist: string = '';
  loading: boolean = false;
  buscar: boolean = false;
  albumName: string[] = [];
  albumImage: string[] = [];
  albumArtistName: string[] = [];
  albumArtistNameTwo: string[] = [];
  albumYear: string[] = [];
  idsAlbum: string[] = [];
  idsArtists: string[] = [];
  idsArtistsTwo: string[] = [];


  ngOnInit(){
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const term = params.get('search');
      if (term) {
        this.artistNameArtist = term;
        this.searchService.setSearchTerm(term);
        this.searchMethod()
      }
    });

    this.searchSubscription = this.searchService.searchTerm$.subscribe(data => {
      const { id, term } = data;
      this.artistNameArtist = term || ''; // Actualizar el valor del input
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

  takeId(id: string) {
    this.takeIdAlbum.setAlgoId(id);
  }

  searchMethod() {
    // if (!this.searchTerm.checkTerm(this.artistNameArtist)) {
    //   console.error('Introduce un artista')
    // } else {
      this.loadingService.setLoading(true)
      this.loading = true;
      this.buscar = true;
      this.artistSearch.getartistAlbum().subscribe((response: Album) => {
        this.idsAlbum = [];
        this.albumArtistName = [];
        this.albumYear= [];
        this.albumImage = [];
        this.albumName = [];
        this.albumArtistNameTwo = [];
        this.idsArtistsTwo = [];
        this.idsArtists = [];

        for (let album of response.albums.items) {
          this.idsAlbum.push(album.id)
          this.albumName.push(album.name)

          this.idsArtists.push(album.artists[0].id)
          this.albumArtistName.push(album.artists[0].name);
          if (album.artists && album.artists.length > 1) {
            this.albumArtistNameTwo.push(album.artists[1].name);
            this.idsArtistsTwo.push(album.artists[1].id)
        } else {
            this.albumArtistNameTwo.push('');
            this.idsArtistsTwo.push('');
        }

          this.albumYear.push(album.release_date)

          if (album.images && album.images.length > 0) {
            this.albumImage.push(album.images[0].url); 
          } else {
            this.albumImage.push('../../assets/Artistasinfoto.png'); 
          } 
        }
        this.loadingService.setLoading(false);
        this.loading = false;
      });
    }
  }
// }

