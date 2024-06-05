import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  loadingService = inject(LoadingService)
  snack = inject(MatSnackBar)
  cdr = inject(ChangeDetectorRef)
  timer = 15 * 60 * 1000;
  currentTime = new Date().getTime();
  isLoading: boolean = true;
  snackBarShown: boolean = JSON.parse(localStorage.getItem('snackBarShown') || 'false');
  snackBarShownTime: number = JSON.parse(localStorage.getItem('snackBarShownTime') || '0');

  title = 'searchMusic';

  ngOnInit() {
    document.body.classList.add('dark-mode');
    this.loadingService.isLoading$().subscribe(state => {
      this.isLoading = state;
      this.cdr.detectChanges();
    });

    if (!this.snackBarShown) {
      this.snack.open('El servidor se está iniciando, espere un momento (de media unos 50s).', 'Cerrar',
        { verticalPosition: 'top' })
      this.snackBarShown = true;
      this.snackBarShownTime = new Date().getTime(); // Guardar el tiempo actual
      localStorage.setItem('snackBarShown', JSON.stringify(true)); // Almacenar en el almacenamiento local que el Snackbar se ha mostrado
      localStorage.setItem('snackBarShownTime', JSON.stringify(this.snackBarShownTime)); // Almacenar la marca de tiempo actual
    }
    if (this.currentTime - this.snackBarShownTime > this.timer) {
      localStorage.removeItem('snackBarShown');
      localStorage.removeItem('snackBarShownTime');
    }
  }
}






