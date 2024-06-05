import { Component, inject } from '@angular/core';
import { NavegationArrowService } from '../../../services/navegation-arrow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrl: './simple.component.css'
})
export class SimpleComponent {
  navigationService = inject(NavegationArrowService)
  router = inject(Router)

  navigateBack(): void {
    this.navigationService.back()
  }

  navigateForward(): void {
    this.navigationService.forward();
  }

  canGoBack(): boolean {
    return this.navigationService.canGoBack();
  }

  canGoForward(): boolean {
    return this.navigationService.canGoForward();
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
