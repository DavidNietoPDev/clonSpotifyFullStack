import { Component, OnInit, inject } from '@angular/core';
import { PressSearchService } from './services/press-search.service';
import { environment } from '../environments/environmentDev';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  searchTake = inject(PressSearchService)

  title = 'searchMusic';

  loader: boolean = true;
  search = this.searchTake.getSearch();

  ngOnInit() {
    document.body.classList.add('dark-mode');
    console.log('Environment:', environment)
  }

  squareLoadingChange(loading: boolean) {
    this.loader = loading;
  }

}



