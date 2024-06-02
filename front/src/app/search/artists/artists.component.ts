import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { Artista } from '../../models/artista.model';
import { SearchServiceService } from '../../services/search-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TakeIdsService } from '../../services/take-ids.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html', 
  styleUrl: './artists.component.css'
})
export class ArtistsComponent {
  @ViewChild('buttonArtists') buttonArtists: ElementRef;
  route = inject(ActivatedRoute)
  searchTerm = inject(SearchServiceService)
  artistSearch = inject(SearchBarService)
  loadingService = inject(LoadingService)
  takeId = inject(TakeIdsService)
  constructor(private router: Router) { }
  subscription: Subscription;

  artistImage: string[] = [];
  artistName: string[] = [];
  idArtist: string[] = [];
  loading: boolean = false;
  artistNameArtist: string = this.searchTerm.getSearchTerm();
  buscar: boolean = false;

  ngOnInit() {
    this.searchMethod();
    this.subscription = this.searchTerm.searchTerm$.subscribe(term => {
      this.artistNameArtist = term;
      this.searchMethod()
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  takeIdArtist (id: string) {
    this.takeId.setAlgoId(id);
  }

  searchMethod() {
    this.loading = true;
    this.loadingService.setLoading(true)
    if (!this.searchTerm.checkTerm(this.artistNameArtist)) {
      console.error('Introduce un artista')
      this.loading = false;
    } else {
      this.artistSearch.getArtist().subscribe((response: Artista) => {
        this.artistImage = [];
        this.artistName = [];
        this.buscar = true;
        for (let artist of response.artists.items) {
          this.idArtist.push(artist.id)
          this.artistName.push(artist.name)
          if (artist.images && artist.images.length > 0) {
            this.artistImage.push(artist.images[0].url); // Verifica si hay imágenes disponibles
          } else {
            // Si no hay imagen disponible, puedes agregar una imagen por defecto o dejar este espacio en blanco
            this.artistImage.push('../../assets/Artistasinfoto.png'); 
          } 
        }
        this.loadingService.setLoading(false)
        this.loading = false;
      });
    }
  }
}
