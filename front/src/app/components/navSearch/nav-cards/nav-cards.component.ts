import { Component, inject } from '@angular/core';
import { SearchServiceService } from '../../../services/search-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-cards',
  templateUrl: './nav-cards.component.html',
  styleUrl: './nav-cards.component.css'
})
export class NavCardsComponent {
  search = inject(SearchServiceService)
  router = inject(Router)

  searchTerm = this.search.getSearchTerm();

}
