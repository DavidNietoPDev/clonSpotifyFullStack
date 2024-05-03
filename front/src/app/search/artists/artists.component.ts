import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { Artista } from '../../models/artista.model';
import { SearchServiceService } from '../../services/search-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TakeIdsService } from '../../services/take-ids.service';

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
  takeId = inject(TakeIdsService)
  constructor(private router: Router) { }

  artistImage: string[] = [];
  artistName: string[] = [];
  idArtist: string[] = [];
  loading: boolean = false;
  artistNameArtist: string = this.searchTerm.getSearchTerm();
  buscar: boolean = false;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.fromSongsComponent || params.fromAlbumsComponent || params.fromSearchComponent) {
        this.buscarArtistas();
      }
    });
  }
  takeIdArtist (id: string) {
    this.takeId.setAlgoId(id);
  }

  navegarAComponenteSongs() {
    // Navegar a SongsComponent y pasar un parámetro indicando que proviene de SearchComponent
    this.router.navigate(['/songs'], { queryParams: { fromArtistsComponent: true } });
  }
  navegarAComponenteSearch() {
    // Navegar a SearchComponent y pasar un parámetro indicando que proviene de SongsComponent
    this.router.navigate(['/search'], { queryParams: { fromArtistsComponent: true } });
  }

  avegarAComponenteAlbums() {
    // Navegar a SearchComponent y pasar un parámetro indicando que proviene de SongsComponent
    this.router.navigate(['/albums'], { queryParams: { fromArtistsComponent: true } });
  }


  buscarArtistas() {
    this.loading = true;
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
        this.loading = false;
      });
    }
  }
}
