import { Component, inject } from '@angular/core';
import { SearchServiceService } from '../../../services/search-service.service';


@Component({
  selector: 'app-input-searcher',
  templateUrl: './input-searcher.component.html',
  styleUrl: './input-searcher.component.css'
})
export class InputSearcherComponent {
  searchTerm = inject(SearchServiceService)
  termSearcher = this.searchTerm.getSearchTerm()

  onEnter(event: KeyboardEvent) {
    if(event.key === 'Enter' && this.termSearcher !== '') {
      const value = (<HTMLInputElement>event.target).value;
      this.searchTerm.emitEnterPressed(value);
    }
  }
}
