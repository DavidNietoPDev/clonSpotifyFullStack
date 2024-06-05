import { Component, inject } from '@angular/core';
import { NavegationArrowService } from '../../../services/navegation-arrow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-specific-nav',
  templateUrl: './specific-nav.component.html',
  styleUrl: './specific-nav.component.css'
})
export class SpecificNavComponent {
  navigationService = inject(NavegationArrowService)
  router = inject(Router)

  navigateBack(): void {
    this.navigationService.back()
  }

  navigateForward(): void {
    this.navigationService.forward();
  }
}
