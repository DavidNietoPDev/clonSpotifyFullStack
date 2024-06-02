import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = new BehaviorSubject<boolean>(false);

  setLoading(state: boolean) {
    this.isLoading.next(state);
  }

  getCurrentLoadingState(): boolean {
    return this.isLoading.getValue();
  }

  isLoading$() {
    return this.isLoading.asObservable();
  }
}
