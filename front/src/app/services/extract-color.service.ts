import { Injectable } from '@angular/core';
import * as ColorThief from 'colorthief';



@Injectable({
  providedIn: 'root'
})
export class ExtractColorService {

  
  async getColorDominante(imageUrl: string): Promise<number[]> {
    const colorThief = new ColorThief.default();
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'Anonymous'; // Ensure CORS is enabled
      image.onload = () => {
        resolve(colorThief.getColor(image));
      };
      image.onerror = (error) => {
        reject(error);
      };
      image.src = imageUrl;
    });
  }
}