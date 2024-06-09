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

  @Input()  
  set topTrackList(value: any[]) {
    this._topTrackList = value;
    this.listMethod();
  }
  get topTrackList(): any[] {
    return this._topTrackList;
  }

  id: string[] = [];
  image: string[] = [];
  name: string[] = [];
  artistName: string[] = [];
  albumYear: string[] = [];
  idArtist: string[] = [];

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
        320: {
          slidesPerView: 2, // Número de diapositivas visibles para pantallas pequeñas
          spaceBetween: 10, // Espacio entre diapositivas para pantallas pequeñas
        },
        // Cuando la ventana tiene un ancho >= 640px
        640: {
          slidesPerView: 3, // Número de diapositivas visibles para pantallas medianas
          spaceBetween: 10, // Espacio entre diapositivas para pantallas medianas
        },
        // Cuando la ventana tiene un ancho >= 1024px
        1024: {
          slidesPerView: 5, // Número de diapositivas visibles para pantallas grandes
          spaceBetween: 10, // Espacio entre diapositivas para pantallas grandes
        },
      },
    });
    new Swiper('.swiperTwo', {
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 5,
      spaceBetween: 10,
      breakpoints: {
        320: {
          slidesPerView: 2, // Número de diapositivas visibles para pantallas pequeñas
          spaceBetween: 10, // Espacio entre diapositivas para pantallas pequeñas
        },
        // Cuando la ventana tiene un ancho >= 640px
        640: {
          slidesPerView: 3, // Número de diapositivas visibles para pantallas medianas
          spaceBetween: 10, // Espacio entre diapositivas para pantallas medianas
        },
        // Cuando la ventana tiene un ancho >= 1024px
        1024: {
          slidesPerView: 5, // Número de diapositivas visibles para pantallas grandes
          spaceBetween: 10, // Espacio entre diapositivas para pantallas grandes
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
      } else {
        console.log('no album ni playlist')
      }
    }
    this.loading = false;
  }
}
