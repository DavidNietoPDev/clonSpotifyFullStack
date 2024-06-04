import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { AppComponent } from './app.component';
import { SongsComponent } from './search/songs/songs.component';
import { ArtistsComponent } from './search/artists/artists.component';
import { AlbumsComponent } from './search/albums/albums.component';
import { ArtistIdComponent } from './search/artists/artist-id/artist-id.component';
import { PlayListComponent } from './search/play-list/play-list.component';
import { AlbumDirectComponent } from './search/albums/album-direct/album-direct.component';
import { SongsIdComponent } from './search/songs/songs-id/songs-id.component';
import { CategoriesComponent } from './search/categories/categories.component';
import { MainComponent } from './components/main/main.component';
import { SearchMainComponent } from './search/search-main/search-main.component';


const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch: 'full'},
  { path: 'home', component: MainComponent},
  { path: 'search', component: SearchComponent},
  { path: 'searchMain/:search', component: SearchMainComponent},
  { path: 'songs/:search', component: SongsComponent},
  { path: 'artists/:search', component: ArtistsComponent},
  { path: 'albums/:search', component: AlbumsComponent},
  { path: 'artistId/:Id', component: ArtistIdComponent},
  { path: 'playListId/:Id', component: PlayListComponent},
  { path: 'albumDirect/:Id', component: AlbumDirectComponent},
  { path: 'songsId/:Id', component: SongsIdComponent},
  { path: 'category/:Id/:search', component: CategoriesComponent},
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
