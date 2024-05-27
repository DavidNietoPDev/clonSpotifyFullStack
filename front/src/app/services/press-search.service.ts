import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PressSearchService {

  search: boolean = undefined;

  setSearch(searcher: boolean) {
    this.search = searcher;
  }

  getSearch() {
    return this.search;
  }
}
