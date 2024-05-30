import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-search-complete',
  templateUrl: './nav-search-complete.component.html',
  styleUrl: './nav-search-complete.component.css'
})
export class NavSearchCompleteComponent {
  router = inject(Router)


  ngOnInit() {
    this.checkRoute()
  }

  checkRoute() {

    if (this.router.url === '/home') {
      return true;
    }
    else {
      return false;
    }
  }
}
