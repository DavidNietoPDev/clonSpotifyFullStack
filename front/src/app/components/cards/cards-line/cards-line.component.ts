import { Component, Input } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



@Component({
  selector: 'app-cards-line',
  templateUrl: './cards-line.component.html',
  styleUrl: './cards-line.component.css'
})
export class CardsLineComponent {
  swiper: Swiper;
  _topTrackList: any[] = [];
  _topAlbumList: any[] = [];
  _topPlayListList: any[] = [];

  @Input()
  set topAlbumList(value: any[]) {
    this._topAlbumList = value ?? [];
    this.listAlbum();
  }
  get topAlbumList(): any[] {
    return this._topAlbumList;
  }
  @Input()  
  set topTrackList(value: any[]) {
    this._topTrackList = value ?? [];
    this.listMethod();
  }
  get topTrackList(): any[] {
    return this._topTrackList;
  }
  @Input()  
  set topPlayListList(value: any[]) {
    this._topPlayListList = value ?? [];
    this.listPlayList();
  }
  get topPlayListList(): any[] {
    return this._topPlayListList;
  }

  id: string[] = [];
  image: string[] = [];
  name: string[] = [];
  artistName: string[] = [];
  albumYear: string[] = [];
  idArtist: string[] = [];

  idAlbum: string[] = [];
  imageAlbum: string[] = [];
  nameAlbum: string[] = [];
  artistNameAlbum: string[] = [];
  albumYearAlbum: string[] = [];
  idArtistAlbum: string[] = [];

  idPlayList: string[] = [];
  imagePlayList: string[] = [];
  namePlayList: string[] = [];
  nameDoPlayList: string[] = [];


  loading: boolean = true;
  search: boolean = false;


  ngAfterViewInit(): void {
    new Swiper('.swiper', {
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 5,
      spaceBetween: 10,
      breakpoints: {
        100: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        250: {
          slidesPerView: 2, // Número de diapositivas visibles para pantallas pequeñas
          spaceBetween: 10, // Espacio entre diapositivas para pantallas pequeñas
        },
        // Cuando la ventana tiene un ancho >= 640px
        640: {
          slidesPerView: 3, 
          spaceBetween: 10, 
        },

        1100: {
          slidesPerView: 4, 
          spaceBetween: 10, 
        },

      
        1350: {
          slidesPerView: 5, 
          spaceBetween: 10, 
        },
      },
    });
  }

  check() : boolean {
    return false;
  }

  listMethod() {
    this.loading = true;

    this.id = [];
    this.image = [];
    this.name = [];
    this.artistName= [];
    this.albumYear = [];
    this.idArtist = [];

    for ( let card of this.topTrackList) {
      this.id.push(card.id);
      this.name.push(card.name);
      if(card.release_date) {
        this.albumYear.push(card.release_date)
      } else {
        this.albumYear.push('')
      }
      if(card.images && card.images.length > 0) {
        this.image.push(card.images[0].url)
      } else {
        this.image.push('../../assets/Artistasinfoto.png')
      }
      if(card.artists) {
        for(let artist of card.artists) {
          this.idArtist.push(artist.id)
          if(artist.name && artist.name.length > 0) {
            this.artistName.push(artist.name)
          } else {
            this.artistName.push('')
          }
        }
      } 
    }
  }


  listAlbum() {
    this.loading = true;

    this.idAlbum = [];
    this.imageAlbum = [];
    this.nameAlbum = [];
    this.artistNameAlbum = [];
    this.albumYearAlbum = [];
    this.idArtistAlbum = [];
    
    for ( let card of this.topAlbumList) {
      this.idAlbum.push(card.id);
      this.nameAlbum.push(card.name);
      if(card.release_date) {
        this.albumYearAlbum.push(card.release_date)
      } else {
        this.albumYearAlbum.push('')
      }
      if(card.images && card.images.length > 0) {
        this.imageAlbum.push(card.images[0].url)
      } else {
        this.imageAlbum.push('../../assets/Artistasinfoto.png')
      }
      if(card.artists) {
        for(let artist of card.artists) {
          this.idArtistAlbum.push(artist.id)
          if(artist.name && artist.name.length > 0) {
            this.artistNameAlbum.push(artist.name)
          } else {
            this.artistNameAlbum.push('')
          }
        }
      } 
    }
    this.loading = false;
  }

  listPlayList() {
    this.loading = true;

    this.idPlayList = [];
    this.imagePlayList = [];
    this.namePlayList = [];
    this.nameDoPlayList = [];
    
    for ( let card of this.topPlayListList) {
      this.idPlayList.push(card.id);
      this.namePlayList.push(card.name);
      if(card.images && card.images.length > 0) {
        this.imagePlayList.push(card.images[0].url)
      } else {
        this.imagePlayList.push('../../assets/Artistasinfoto.png')
      }
      this.nameDoPlayList.push(card.owner.display_name)
    }
    this.loading = false;
  }
}
