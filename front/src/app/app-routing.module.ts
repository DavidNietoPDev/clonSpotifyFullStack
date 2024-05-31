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


const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'home', component: MainComponent},
  { path: 'search', component: SearchComponent},
  { path: 'songs', component: SongsComponent},
  { path: 'artists', component: ArtistsComponent},
  { path: 'albums', component: AlbumsComponent},
  { path: 'artistId', component: ArtistIdComponent},
  { path: 'playListId', component: PlayListComponent},
  { path: 'albumDirect', component: AlbumDirectComponent},
  { path: 'songsId', component: SongsIdComponent},
  { path: 'categoryId', component: CategoriesComponent},
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
