import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

interface SearchTerm{
  id: string,
  term?: string;
}
@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  router = inject(Router)
  termName: string = '';
  searchTerm: string = '';
  searchTermSource = new Subject<SearchTerm>();
  clearTermSource = new Subject<void>();
  searchTerm$ = this.searchTermSource.asObservable();

  setSearchTerm(id: string, term?: string, updateUrl: boolean = true) {
    this.searchTerm = id;
    this.termName = term || '';
    this.searchTermSource.next({id, term: this.termName});
    
    
    if (updateUrl) {
      this.updateUrl(id, term);
    }
  }

  setTermName(term: string) {
    this.termName = term;
  }

  getTermName() {
    return this.termName;
  }

  updateUrl(id: string, term?: string) {
    const segments = this.router.url.split('/');
    // Obtener la ruta actual y dividirla en segmentos
    if (term === '') {
      this.router.navigateByUrl('/search');
    } else {
      // Reemplazar el último segmento con el nuevo término de búsqueda
      if (term) {
        segments[segments.length - 1] = term;
        this.router.navigateByUrl(segments.join('/'))
      } else {
        segments[segments.length - 1] = id;
        this.router.navigateByUrl(segments.join('/'));
      }
    }
  }

  setTerm() {
    this.searchTerm = '';
  }

  getSearchTerm() {
    return this.searchTerm;
  }

  clearSearchTerm() {
    this.searchTerm = '';
    this.termName = '';
    this.clearTermSource.next(); // Notificar a los observadores que se limpió el término de búsqueda
    this.router.navigateByUrl('/search'); // Redirigir a la página de búsqueda vacía
  }

  emitEnterPressed(value: string) {
    this.setSearchTerm(value); // Llamar a setSearchTerm() para gestionar el término de búsqueda
  }
}
