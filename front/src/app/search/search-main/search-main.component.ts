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
  loading: boolean = true;

  topTrackList: any[] = [];

  artistSonList: any [] = [];
  albumSonList: any [] = [];
  playListSonList: any [] = [];

  idArtist: string = '';
  imageUrl: string = '';
  artist: string = '';


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
      this.artistName = term || ''; 
    });
  }

  ngOnDestroy() {

    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  searchMethod(): void {

    this.topTrackList = [];
    this.artistSonList = [];
    this.albumSonList = [];
    this.playListSonList = [];

      this.loadingService.setLoading(true);
      this.artistSearch.getArtistAll().subscribe((response: All) => {
        this.buscar = true;
        
        this.idArtist = response.artists.items[0].id;
        this.artist = response.artists.items[0].name;
        this.imageUrl = response.artists.items[0].images[0].url;

        this.albumSonList = response.albums.items;

        this.artistSonList = response.artists.items

        this.playListSonList = response.playlists.items

        this.topTrackList = response.tracks.items.slice(0, 4)

      this.loadingService.setLoading(false);
      this.loading = false;
      });
    } 
  // }

}
