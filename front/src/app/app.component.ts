import { Component, OnInit, inject } from '@angular/core';
import { PressSearchService } from './services/press-search.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  searchTake = inject(PressSearchService)
  title = 'searchMusic';

  search = this.searchTake.getSearch();

  ngOnInit() {
    document.body.classList.add('dark-mode');
  }

  
}



