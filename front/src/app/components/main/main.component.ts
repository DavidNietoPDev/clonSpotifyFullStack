import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
loadingService = inject(LoadingService)
cdr = inject(ChangeDetectorRef)

}
