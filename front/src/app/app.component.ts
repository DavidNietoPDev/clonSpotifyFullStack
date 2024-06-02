import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  loadingService = inject(LoadingService)
  cdr = inject(ChangeDetectorRef)
  isLoading: boolean = true;
  title = 'searchMusic';

  ngOnInit() {
    document.body.classList.add('dark-mode');
    this.loadingService.isLoading$().subscribe(state => {
      this.isLoading = state;
      this.cdr.detectChanges();
    });
  }
}

  




