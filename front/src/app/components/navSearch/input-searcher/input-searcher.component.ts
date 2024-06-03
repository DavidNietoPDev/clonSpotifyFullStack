import { Component, inject } from '@angular/core';
import { SearchServiceService } from '../../../services/search-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-input-searcher',
  templateUrl: './input-searcher.component.html',
  styleUrl: './input-searcher.component.css'
})
export class InputSearcherComponent {
  searchTerm = inject(SearchServiceService)
  termSearcher = this.searchTerm.getSearchTerm()
  router = inject(Router)

  ngOnInit(){
    this.termSearcher = this.searchTerm.getSearchTerm()
  }

  onEnter(event: KeyboardEvent) {
    if(event.key === 'Enter' && this.termSearcher !== '') {
      const value = (<HTMLInputElement>event.target).value;
      this.searchTerm.emitEnterPressed(value);
      this.router.navigate(['/searchMain', value]);
    }
  }
}
