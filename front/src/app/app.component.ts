import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'searchMusic';

  loader: boolean = true;
  search = false;

  ngOnInit() {
    document.body.classList.add('dark-mode');
  }

  squareLoadingChange(loading: boolean) {
    this.loader = loading;
  }

}



