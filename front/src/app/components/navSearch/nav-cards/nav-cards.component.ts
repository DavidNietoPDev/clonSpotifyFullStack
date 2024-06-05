import { Component, inject } from '@angular/core';
import { SearchServiceService } from '../../../services/search-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-nav-cards',
  templateUrl: './nav-cards.component.html',
  styleUrl: './nav-cards.component.css'
})
export class NavCardsComponent {
  routeSubscription: Subscription
  searchSubscription: Subscription
  searchService = inject(SearchServiceService)
  router = inject(Router)
  route = inject(ActivatedRoute)

  searchTerm = '';


  ngOnInit(){
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const term = params.get('search');
      if (term) {
        this.searchTerm = term;
        this.searchService.setSearchTerm(term);
      }
    });

    this.searchSubscription = this.searchService.searchTerm$.subscribe(data => {
      const { id, term } = data;
      this.searchTerm = term || ''; 
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

}
