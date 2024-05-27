import { Component, EventEmitter, Output, inject } from '@angular/core';
import { SearchBarService } from '../../../services/search-bar.service';
import { TakeIdsService } from '../../../services/take-ids.service';
import { Top } from '../../../models/top.model';

@Component({
  selector: 'app-cards-square',
  templateUrl: './cards-square.component.html',
  styleUrl: './cards-square.component.css'
})
export class CardsSquareComponent {
  listCards = inject(SearchBarService)
  takeIdService = inject(TakeIdsService)
  @Output() loadingChange = new EventEmitter<boolean>();

  listName: string[] = [];
  listImage: string[] = [];
  listArtist: string[] = []; 
  listIds: string[] = [];
  loading: boolean = false;

  takeId(id: string) {
    this.takeIdService.setAlgoId(id)
  }

  ngOnInit() {
    this.searchItems();
  }


  searchItems(): void {
    this.loading = true;
    this.loadingChange.emit(this.loading)
    this.listCards.getTopList().subscribe((response: Top) => {
      // this.termSearch.setSearchTerm(this.artistName);
      this.listName = [];
      this.listImage = [];
      this.listArtist = [];
      this.listIds = [];
      for (let playlist of response.playlists.items) {
        this.listIds.push(playlist.id)
        this.listName.push(playlist.name)
        this.listArtist.push(playlist.owner.display_name)
        if(playlist.images && playlist.images.length > 0) {
        this.listImage.push(playlist.images[0].url);
        } else {
          this.listImage.push('../assets/Artistasinfoto.png');
        }
      }
      this.loading = false;
      this.loadingChange.emit(this.loading)
    });
  }
}
