import { Component } from '@angular/core';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.css'
})
export class HomeSearchComponent {

  search = false;
  onClickSearch() {
    this.search = false;
  }
}
