import { Component, inject } from '@angular/core';
import { SearchServiceService } from '../../../services/search-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.css'
})
export class HomeSearchComponent {
  search: boolean = false;
  term = inject(SearchServiceService)
  router = inject(Router)

  onClickSearch() {
    this.search = true;
    this.term.clearSearchTerm()
  }

  onClickHome() {
    this.search = false;
    this.router.navigate(['/home'])
  }
}
