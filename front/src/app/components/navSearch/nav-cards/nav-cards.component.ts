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

  // Método para marcar los botones activos según la URL actual
  // updateActiveButtons(): void {
  //   const currentUrl = '/' + this.router.url.split('/')[1];
  //   const buttons = document.querySelectorAll('.bsq');
  //   buttons.forEach((button: HTMLElement, index: number) => {
  //     console.log(this.buttonUrls[index], 'button')
  //     const buttonUrl = this.buttonUrls[index];
  //     if (currentUrl === buttonUrl) {
  //       console.log(buttonUrl, currentUrl)
  //       console.log(button)
  //       button.classList.add('bsq','active');
  //     } 
  //   });
  // }
}
