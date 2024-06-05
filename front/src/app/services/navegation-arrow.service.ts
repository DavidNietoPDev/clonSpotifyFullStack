import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SearchServiceService } from './search-service.service';

@Injectable({
  providedIn: 'root'
})
export class NavegationArrowService {
  searchTerm = inject(SearchServiceService)
  history: string[] = [];
  currentIndex: number = -1;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        if(this.currentIndex === -1 || this.history[this.currentIndex] !== event.urlAfterRedirects) {
          this.history = this.history.slice(0, this.currentIndex +1);
          this.history.push(event.urlAfterRedirects);
          this.currentIndex = this.history.length -1;
        }
      }
    });
  }

  back(): void {
    if(this.currentIndex > 0) {
      this.currentIndex--;
      this.router.navigateByUrl(this.history[this.currentIndex]);
    }
  }

  forward(): void {
    if(this.currentIndex < this.history.length -1) {
      this.currentIndex++;
      this.router.navigateByUrl(this.history[this.currentIndex]);
    }
  }
}
