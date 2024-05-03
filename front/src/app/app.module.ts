import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SongsComponent } from './search/songs/songs.component';
import { ArtistsComponent } from './search/artists/artists.component';
import { AlbumsComponent } from './search/albums/albums.component';
import { PipeTruncatePipe } from './pipes/pipe-truncate.pipe';
import { PipeDuracionPipe } from './pipes/pipe-duracion.pipe';
import { ArtistIdComponent } from './search/artists/artist-id/artist-id.component';
import { PlayListComponent } from './search/play-list/play-list.component';
import { NumberFormatPipe } from './pipes/number-format.pipe';
import { AlbumDirectComponent } from './search/albums/album-direct/album-direct.component';
import { SongsIdComponent } from './search/songs/songs-id/songs-id.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SongsComponent,
    ArtistsComponent,
    AlbumsComponent,
    PipeTruncatePipe,
    PipeDuracionPipe,
    ArtistIdComponent,
    PlayListComponent,
    NumberFormatPipe,
    AlbumDirectComponent,
    SongsIdComponent,
    
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
