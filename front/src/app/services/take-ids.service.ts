import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TakeIdsService {
  algoId: string = '';
  


  setAlgoId(something: string) {
    this.algoId = something;
  }

  getAlgoId() {
    return this.algoId;
  }
}
