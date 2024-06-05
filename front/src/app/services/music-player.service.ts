import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {
currentAudio : HTMLAudioElement;
snackBar = inject(MatSnackBar)
globalVolume: number = 0.5;
  playMusic(previewUrl: any) {
    if (previewUrl) {             
      if(this.currentAudio) {             //Si se está reproduciendo algo se pausa
        this.currentAudio.pause();
      }
      const audio = new Audio(previewUrl)
      this.currentAudio = audio;
      audio.volume = this.globalVolume;          // y seguidamente se reproduce
      audio.play();
    } else {
      this.snackBar.open('El audio no está disponible', 'Cerrar', { duration: 2000})
    }
  }


  togglePlayBack(previewUrl: string) {
    const audio = new Audio(previewUrl)
    audio.volume = this.globalVolume;   
    if (this.currentAudio && this.currentAudio.src === previewUrl) {  //Si lo que se está reproduciendo es igual
      if (this.currentAudio.paused) {                                 //a previewUrl, se pausa y si está pasusado
        this.currentAudio.play(); //                                  // se le da al play
      } else {
        this.currentAudio.pause();
      }
    } else {
      this.playMusic(previewUrl);                                    //Si no es la misma pista se llama al método
    }
  }

  stopMusic() {
    if (this.currentAudio) {
      this.currentAudio.pause();
    }
  }

  setVolume(volume: number) {
    this.globalVolume = volume;
    if (this.currentAudio) {
      this.currentAudio.volume = volume;
    }
  }
}
