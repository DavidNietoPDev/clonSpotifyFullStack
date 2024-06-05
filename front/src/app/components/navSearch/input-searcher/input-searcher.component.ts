import { Component, inject } from '@angular/core';
import { SearchServiceService } from '../../../services/search-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-input-searcher',
  templateUrl: './input-searcher.component.html',
  styleUrl: './input-searcher.component.css'
})
export class InputSearcherComponent {
  routeSubscription: Subscription;
  searchSubscription: Subscription;;
  searchService = inject(SearchServiceService)
  termSearcher: string = '';
  router = inject(Router)
  route = inject(ActivatedRoute)

  ngOnInit(){
    this.termSearcher = this.searchService.getSearchTerm();

    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const term = params.get('search');
      if (term) {
        this.termSearcher = term;
        this.searchService.setSearchTerm(term);
      }
    });

    this.searchService.clearTermSource.subscribe(() => {
      this.termSearcher = '';
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

  onEnter(event: KeyboardEvent) {
    if(event.key === 'Enter' && this.termSearcher !== '' && this.termSearcher !== undefined) {
      const value = (<HTMLInputElement>event.target).value;
      this.searchService.emitEnterPressed(value);
      this.router.navigate(['/searchMain', value]);
    }
  }
}
