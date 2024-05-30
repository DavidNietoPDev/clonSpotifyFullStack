import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  searchTerm: string = '';
  searchTermSource = new Subject<string>();
  searchTerm$ = this.searchTermSource.asObservable();

  setSearchTerm(term: string) {
    this.searchTerm = term;
    this.searchTermSource.next(term); // Emitir el término de búsqueda cuando se actualiza
  }

  getSearchTerm() {
    return this.searchTerm;
  }

  checkTerm(term: string) {
    if(term === this.searchTerm && this.searchTerm !== '') {
      return true;
    } else if ( term !== this.searchTerm && term !== '') {
      this.setSearchTerm(term)
      return true;
    } else {
      this.setSearchTerm(term)
      return false;
    }
  }

  emitEnterPressed(value: string) {
    this.setSearchTerm(value); // Llamar a setSearchTerm() para gestionar el término de búsqueda
  }
}
