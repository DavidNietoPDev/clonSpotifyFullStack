import { Component, OnInit, inject } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { Track, Item } from '../../models/tracks.model';
import { SearchServiceService } from '../../services/search-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicPlayerService } from '../../services/music-player.service';
import { TakeIdsService } from '../../services/take-ids.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.css'
})

export class SongsComponent implements OnInit {
  artistSearch = inject(SearchBarService);
  searchService = inject(SearchServiceService);
  route = inject(ActivatedRoute);
  loadingService = inject(LoadingService)
  musicPlayer = inject(MusicPlayerService)
  takeId = inject(TakeIdsService)
  constructor(private router: Router) { }

  routeSubscription: Subscription;
  searchSubscription: Subscription;
  trackList: Item [] = [];

  artistNameSongs: string = '';

  loading: boolean = false;
  buscar: boolean = false;

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const term = params.get('search');
      if (term) {
        this.artistNameSongs = term;
        this.searchService.setSearchTerm(term);
        this.searchMethod()
      }
    });

    this.searchSubscription = this.searchService.searchTerm$.subscribe(data => {
      const { id, term } = data;
      this.artistNameSongs = term || ''; // Actualizar el valor del input
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

  takeIdAll(id: string) {
    this.takeId.setAlgoId(id);
  }

  searchMethod(): void {
    this.loadingService.setLoading(true);
    this.loading = true;
    this.buscar = true;
    this.artistSearch.getArtistTopTracks().subscribe((response: Track) => {
      for (let track of response.tracks.items) {
        this.trackList.push(track)
      }
    });
  }
}
    

