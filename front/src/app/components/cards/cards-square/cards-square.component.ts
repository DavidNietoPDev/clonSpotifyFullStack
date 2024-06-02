import { Component, inject } from '@angular/core';
import { SearchBarService } from '../../../services/search-bar.service';
import { TakeIdsService } from '../../../services/take-ids.service';
import { Top } from '../../../models/top.model';
import { Categories } from '../../../models/categories.model';
import { Router } from '@angular/router';
import { SearchServiceService } from '../../../services/search-service.service';
import { LoadingService } from '../../../services/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cards-square',
  templateUrl: './cards-square.component.html',
  styleUrl: './cards-square.component.css'
})
export class CardsSquareComponent {
  searchTerm = inject(SearchServiceService)
  listCards = inject(SearchBarService)
  takeIdService = inject(TakeIdsService)
  loadingService = inject(LoadingService)
  snack = inject(MatSnackBar)
  router = inject(Router)

  isLoading: boolean = true;
  listName: string[] = [];
  listImage: string[] = [];
  listArtist: string[] = []; 
  listIds: string[] = [];
  value: string;
  

  getTerm(term: string) {
    this.searchTerm.setSearchTerm(term)
  }

  takeId(id: string) {
    this.takeIdService.setAlgoId(id)
  }

  ngOnInit() {
    if(this.checkRoute()) {
      this.searchCategories();
    } else {
      this.searchItems();
    }
  }

  checkRoute() {
    if(this.router.url === '/search'){
      return true;
    } 
  }

  searchItems(): void {
    this.loadingService.setLoading(true);
    const timeoutThreshold = 5000; 
    let timerId: any;
    const showSnackBarWhenLoaded = () => {
      if (this.isLoading) {
        clearTimeout(timerId); // Limpiar el temporizador si isLoading se establece en falso
        this.snack.open('El servidor se está iniciando, espere un momento (de media unos 50s).', 'Cerrar', {
          verticalPosition: 'top' // Mostrar el Snackbar en la parte superior de la pantalla
        });
      } else {
        timerId = setTimeout(showSnackBarWhenLoaded, 100); // Esperar 100ms antes de verificar de nuevo
      }
    };
    timerId = setTimeout(showSnackBarWhenLoaded, timeoutThreshold);
    this.listCards.getTopList().subscribe((response: Top) => {
      this.listName = [];
      this.listImage = [];
      this.listArtist = [];
      this.listIds = [];
      for (let playlist of response.playlists.items) {
        this.listIds.push(playlist.id)
        this.listName.push(playlist.name)
        this.listArtist.push(playlist.owner.display_name)
        if(playlist.images && playlist.images.length > 0) {
        this.listImage.push(playlist.images[0].url);
        } else {
          this.listImage.push('../assets/Artistasinfoto.png');
        }
      }
      this.loadingService.setLoading(false);
      this.isLoading = false;
    });
  }



  searchCategories() {
    this.listName = [];
    this.listImage = [];
    this.listIds = [];
    this.loadingService.setLoading(true);
    this.listCards.getCategories().subscribe((response: Categories) => {
      for (let category of response.categories.items) {
        this.listIds.push(category.id);
        this.listImage.push(category.icons[0].url);
        this.listName.push(category.name);
      }
      this.loadingService.setLoading(false);
      this.isLoading = false;
    })
  }
}
