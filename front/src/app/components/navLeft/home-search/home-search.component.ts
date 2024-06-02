import { Component } from '@angular/core';


@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.css'
})
export class HomeSearchComponent {
  search: boolean = false;

  onClickSearch() {
    this.search = true;
  }

  onClickHome() {
    this.search = false;
  }
}
