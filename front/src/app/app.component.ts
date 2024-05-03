import { Component, inject } from '@angular/core';
import { Top } from './models/top.model';
import { SearchBarService } from './services/search-bar.service';
import { TakeIdsService } from './services/take-ids.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  artistSearch = inject(SearchBarService)
  takeIdPlaylist = inject(TakeIdsService)
  topListName: string[] = [];
  topListImage: string[] = [];
  topListArtist: string[] = []; 
  idsPlaylist: string[] = [];
  loading: boolean = false;
  title = 'searchMusic';
  search = false;

  takeId(id: string) {
    this.takeIdPlaylist.setAlgoId(id)
  }

  ngOnInit() {
    document.body.classList.add('dark-mode');
    this.buscarArtista();
  }

  buscar() {
    this.search = false;
  }

  buscarArtista(): void {
    this.loading = true;
    this.artistSearch.getTopList().subscribe((response: Top) => {
      // this.termSearch.setSearchTerm(this.artistName);
      this.topListName = [];
      this.topListImage = [];
      this.topListArtist = [];
      this.idsPlaylist = [];
      for (let playlist of response.playlists.items) {
        this.idsPlaylist.push(playlist.id)
        this.topListName.push(playlist.name)
        this.topListArtist.push(playlist.owner.display_name)
        if(playlist.images && playlist.images.length > 0) {
        this.topListImage.push(playlist.images[0].url);
        } else {
          this.topListImage.push('../assets/Artistasinfoto.png');
        }
      }
      this.loading = false;
    });
  }
}



