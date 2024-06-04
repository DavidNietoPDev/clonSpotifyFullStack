import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  router = inject(Router)
  termName: string = '';
  searchTerm: string = '';
  searchTermSource = new Subject<string>();
  searchTerm$ = this.searchTermSource.asObservable();

  setSearchTerm(id: string, term?:string, updateUrl: boolean = true) {
    this.searchTerm = id;
    this.termName = term;
    this.searchTermSource.next(id);
    this.searchTermSource.next(term);
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

  updateUrl(id: string, term?:string) {
    // Obtener la ruta actual y dividirla en segmentos
    const segments = this.router.url.split('/');
    // Reemplazar el último segmento con el nuevo término de búsqueda
    if(term){
      segments[segments.length -1] = term;
      this.router.navigateByUrl(segments.join('/'))
    } else {
      segments[segments.length - 1] = id;
      this.router.navigateByUrl(segments.join('/'));
    }
    
   
   
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
