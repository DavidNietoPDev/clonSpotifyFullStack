import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  router = inject(Router)
  searchTerm: string = '';
  searchTermSource = new Subject<string>();
  searchTerm$ = this.searchTermSource.asObservable();

  setSearchTerm(term: string, updateUrl: boolean = true) {
    console.log(term)
    this.searchTerm = term;
    this.searchTermSource.next(term);
    if (updateUrl) {
      this.updateUrl(term);
      console.log(this.updateUrl(term), 'extraUpdate')
    }
  }

  updateUrl(term: string) {
    // Obtener la ruta actual y dividirla en segmentos
    console.log(term)
    console.log(this.router.url, 'actual ruta  ')
    const segments = this.router.url.split('/');
    // Reemplazar el último segmento con el nuevo término de búsqueda
    segments[segments.length - 1] = term;
    console.log(segments[segments.length -1], 'segmentos')
    // Reconstruir la URL con el nuevo término de búsqueda y navegar a ella
    console.log(segments.join('/'), 'ultimo')
   this.router.navigateByUrl(segments.join('/'));
  }

  getSearchTerm() {
    return this.searchTerm;
  }

  // checkTerm(term: string) {
  //   if (term === this.searchTerm && this.searchTerm !== '') {
  //     return true;
  //   } else if (term !== this.searchTerm && term !== '') {
  //     this.setSearchTerm(term)
  //     return true;
  //   } else {
  //     this.setSearchTerm(term)
  //     return false;
  //   }
  // }

  emitEnterPressed(value: string) {
    this.setSearchTerm(value); // Llamar a setSearchTerm() para gestionar el término de búsqueda
  }
}
