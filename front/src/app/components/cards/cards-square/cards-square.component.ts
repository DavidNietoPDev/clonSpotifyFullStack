import { Component, inject } from '@angular/core';
import { SearchBarService } from '../../../services/search-bar.service';
import { TakeIdsService } from '../../../services/take-ids.service';
import { Top } from '../../../models/top.model';
import { Categories } from '../../../models/categories.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchServiceService } from '../../../services/search-service.service';
import { LoadingService } from '../../../services/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cards-square',
  templateUrl: './cards-square.component.html',
  styleUrl: './cards-square.component.css'
})
export class CardsSquareComponent {
  searcherTerm = inject(SearchServiceService)
  listCards = inject(SearchBarService)
  takeIdService = inject(TakeIdsService)
  loadingService = inject(LoadingService)
  snack = inject(MatSnackBar)
  router = inject(Router)
  route = inject(ActivatedRoute)

  subscription: Subscription;
  searchTerm: string = '';
  snackBarShown: boolean = JSON.parse(localStorage.getItem('snackBarShown') || 'false');
  snackBarShownTime: number = JSON.parse(localStorage.getItem('snackBarShownTime') || '0');

  
  isLoading: boolean = true;
  listName: string[] = [];
  listImage: string[] = [];
  listArtist: string[] = [];
  listIds: string[] = [];


  navigateTo(term: string) {
  this.router.navigate(['/category', term])
  }

  takeId(id: string) {
    this.takeIdService.setAlgoId(id)
  }

  ngOnInit() {
    if (this.checkRoute()) {
      this.searchCategories();
    } else {
      this.searchItems();
    }
    const timer = 15 * 60 * 1000;
    const currentTime = new Date().getTime();
    if (currentTime - this.snackBarShownTime > timer) {
      localStorage.removeItem('snackBarShown');
      localStorage.removeItem('snackBarShownTime');
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  

  checkRoute() {
    if (this.router.url === '/search') {
      return true;
    }
  }

  searchItems(): void {
    this.loadingService.setLoading(true);

    if (!this.snackBarShown) {
      this.snack.open('El servidor se está iniciando, espere un momento (de media unos 50s).', 'Cerrar',
        { verticalPosition: 'top' })
    }

    this.snackBarShown = true;
    this.snackBarShownTime = new Date().getTime(); // Guardar el tiempo actual
    localStorage.setItem('snackBarShown', JSON.stringify(true)); // Almacenar en el almacenamiento local que el Snackbar se ha mostrado
    localStorage.setItem('snackBarShownTime', JSON.stringify(this.snackBarShownTime)); // Almacenar la marca de tiempo actual
    

    this.listCards.getTopList().subscribe((response: Top) => {
      this.listName = [];
      this.listImage = [];
      this.listArtist = [];
      this.listIds = [];
      for (let playlist of response.playlists.items) {
        this.listIds.push(playlist.id)
        this.listName.push(playlist.name)
        this.listArtist.push(playlist.owner.display_name)
        if (playlist.images && playlist.images.length > 0) {
          this.listImage.push(playlist.images[0].url);
        } else {
          this.listImage.push('../assets/Artistasinfoto.png');
        }
      }
      this.loadingService.setLoading(false);
      this.snack.dismiss();
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
