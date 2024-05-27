import { Component, inject } from '@angular/core';
import { PressSearchService } from '../../../services/press-search.service';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.css'
})
export class HomeSearchComponent {
  searchTake = inject(PressSearchService)
  search: boolean = false;

  onClickSearch() {
    this.search = true;
    this.searchTake.setSearch(this.search)
  }

  onClickHome() {
    this.search = false;
    this.searchTake.setSearch(this.search)
  }
}
