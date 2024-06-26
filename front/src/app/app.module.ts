import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatSliderModule} from '@angular/material/slider';
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
import { CategoriesComponent } from './search/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavLeftComponent } from './components/nav-left/nav-left.component';
import { HomeSearchComponent } from './components/navLeft/home-search/home-search.component';
import { LibraryComponent } from './components/navLeft/library/library.component';
import { FooterLeftComponent } from './components/navLeft/footer-left/footer-left.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SimpleComponent } from './components/navSearch/simple/simple.component';
import { CardsSquareComponent } from './components/cards/cards-square/cards-square.component';
import { InputSearcherComponent } from './components/navSearch/input-searcher/input-searcher.component';
import { NavCardsComponent } from './components/navSearch/nav-cards/nav-cards.component';
import { MainComponent } from './components/main/main.component';
import { HeaderBaseComponent } from './components/headersIds/header-base/header-base.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SearchMainComponent } from './search/search-main/search-main.component';
import { SpecificNavComponent } from './components/navSearch/specific-nav/specific-nav.component';
import { ListSongsComponent } from './components/list-songs/list-songs.component';
import { CardsLineComponent } from './components/cards/cards-line/cards-line.component';
import { register } from 'swiper/element/bundle';


register();
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
    CategoriesComponent,
    FooterComponent,
    NavLeftComponent,
    HomeSearchComponent,
    LibraryComponent,
    FooterLeftComponent,
    LoaderComponent,
    SimpleComponent,
    CardsSquareComponent,
    InputSearcherComponent,
    NavCardsComponent,
    MainComponent,
    HeaderBaseComponent,
    SearchMainComponent,
    SpecificNavComponent,
    ListSongsComponent,
    CardsLineComponent,
    

    
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSliderModule
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
