import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  loader: boolean = true;

  squareLoadingChange(loading: boolean) {
    this.loader = loading;
  }
}
