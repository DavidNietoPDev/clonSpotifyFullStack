import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable} from 'rxjs';
import { All } from '../models/artist.model';
import { Track } from '../models/tracks.model';
import { SearchServiceService } from './search-service.service';
import { Top } from '../models/top.model';
import { Artista } from '../models/artista.model';
import { Album } from '../models/album.model';
import { PlayList } from '../models/playlist.model';
import { AlbumID } from '../models/albumId.model';
import { ArtistID } from '../models/artistId.model';
import { TrackID } from '../models/trackId.model';
import { Categories } from '../models/categories.model';
import { Category } from '../models/categry.model';
import { environment } from '../../environments/environmentDev';


export interface ArtistResponse {
  artistas: any;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})


export class SearchBarService {
  http = inject(HttpClient)
  searchterm = inject(SearchServiceService);
  baseUrl = environment.apiUrl;
  searchTerm = '';



 getArtist(): Observable<Artista> {
  const searcherTerm = this.searchterm.getSearchTerm();
  const params = new HttpParams().set('query', searcherTerm);
  return this.http.get<Artista>(`${this.baseUrl}${'/artist'}`, { params })  
 }

 getArtistTopTracks(): Observable<Track> {
  const searcherTerm = this.searchterm.getSearchTerm();
  const params = new HttpParams().set('query', searcherTerm);
  return this.http.get<Track>(`${this.baseUrl}${'/artistTopTracks'}`, { params })
 }
    

getArtistAll(): Observable<All> {
  const searcherTerm = this.searchterm.getSearchTerm();
  const params = new HttpParams().set('query', searcherTerm);
  return this.http.get<All>(`${this.baseUrl}/artistAll`, { params });
}

  getTopList(): Observable<Top> {
    return this.http.get<Top>(`${this.baseUrl}${'/topList'}`)
  }


  getartistAlbum(): Observable<Album> {
    const searcherTerm = this.searchterm.getSearchTerm();
    const params = new HttpParams().set('query', searcherTerm);
    return this.http.get<Album>(`${this.baseUrl}${'/artistAlbum'}`, { params })
  }

  
  getCategories(): Observable<Categories> {
    return this.http.get<Categories>(`${this.baseUrl}${'/categorys'}`)
  }









  getPlayList(playListId: string): Observable<PlayList> {
    return this.http.get<PlayList>(`${this.baseUrl}${'/playList'}/${playListId}`)
  }

  getAlbumId(albumId: string): Observable<AlbumID> {
    return this.http.get<AlbumID>(`${this.baseUrl}${'/albumId'}/${albumId}`)
  }

  getArtistId(artistId: string): Observable<ArtistID> {
    return this.http.get<ArtistID>(`${this.baseUrl}${'/artistId'}/${artistId}`)
  }

  getTrackId(trackId: string): Observable<TrackID> {
    return this.http.get<TrackID>(`${this.baseUrl}${'/songsId'}/${trackId}`)
  }

  getCategoryId(categoryId: string): Observable<Category> {
    const searcherTerm = this.searchterm.getSearchTerm();
    const params = new HttpParams().set('query', searcherTerm);
    return this.http.get<Category>(`${this.baseUrl}${'/categoriesId'}/${categoryId}`,{ params })
  }
}
  
 
