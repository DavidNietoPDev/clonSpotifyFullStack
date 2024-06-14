import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TakeIdsService {
  algoId: string = '';
  cont: number = 0;
  

  setAlgoId(something: string) {
    this.algoId = something;
  }

  getAlgoId() {
    return this.algoId;
  }


  setCont() {
    this.cont++;
  }
  clearCont() {
    this.cont = 0;
  }

  getCont() {
    return this.cont;
  }
}
