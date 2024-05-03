import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  searchTerm: string = '';

  setSearchTerm(term: string) {
    this.searchTerm = term;
  }

  getSearchTerm() {
    return this.searchTerm;
  }

  checkTerm(term: string) {
    if(term == this.searchTerm && this.searchTerm != '') {
      return true;
    } else if ( term != this.searchTerm && term != '') {
      this.setSearchTerm(term)
      return true;
    } else {
      this.setSearchTerm(term)
      return false;
    }
  }
}
