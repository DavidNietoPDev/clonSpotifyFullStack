import {  Component,  Input } from '@angular/core';

@Component({
  selector: 'app-swiper-prueba',
  templateUrl: './swiper-prueba.component.html',
  styleUrl: './swiper-prueba.component.css'
})
export class SwiperPruebaComponent {
  _topTrackList: any[] = [];

  @Input()  
  set topTrackList(value: any[]) {
    this._topTrackList = value ?? [];
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

  listMethod() {
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

}

