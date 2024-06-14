import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {
  currentAudio: HTMLAudioElement;
  snackBar = inject(MatSnackBar)
  globalVolume: number = 0.1;

  playingSubject = new BehaviorSubject<boolean>(false);
  isPlaying$ = this.playingSubject.asObservable();

  trackDetailsSubject = new BehaviorSubject<any>(null);
  trackDetails$ = this.trackDetailsSubject.asObservable();

  songsSubject = new BehaviorSubject<any[]>([]);
  songs$ = this.songsSubject.asObservable();

  currentIndexSubject = new BehaviorSubject<number>(0);
  currentIndex$ = this.currentIndexSubject.asObservable();

  playMusic(previewUrl: string, trackDetails: any) {
    if (previewUrl) {
      if (this.currentAudio && this.currentAudio.src === previewUrl) {
        // Si la canción actual es la misma que la nueva, alternar entre play/pause
        if (this.currentAudio.paused) {
          this.currentAudio.play();
          this.playingSubject.next(true);
        } else {
          this.currentAudio.pause();
          this.playingSubject.next(false);
        }
      } else {
        // Si hay una canción sonando, detenerla
        if (this.currentAudio) {
          this.currentAudio.pause();
        }

        // Crear una nueva instancia de Audio y reproducir la nueva canción
        this.currentAudio = new Audio(previewUrl);
        this.currentAudio.volume = this.globalVolume;
        this.currentAudio.play();
        this.playingSubject.next(true);
        this.trackDetailsSubject.next(trackDetails); // Actualiza los detalles de la pista
        this.currentAudio.addEventListener('ended', this.onTrackEnd); // Añadir el evento ended
      }
    } else {
      this.snackBar.open('El audio no está disponible', 'Cerrar', { duration: 2000 });
    }
  }

  stopMusic() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.playingSubject.next(false); // Actualiza el estado a 'pausado'
    }
  }

  setVolume(volume: number) {
    this.globalVolume = volume;
    if (this.currentAudio) {
      this.currentAudio.volume = volume;
    }
  }

  clearSongs() {
    this.songsSubject.next([]);
  }

  setSongs(newSongs: any[]) {
    const currentSongs = this.songsSubject.value;
    const updatedSongs = currentSongs.concat(newSongs);
    this.songsSubject.next(updatedSongs);
  }

  setCurrentIndex(index: number) {
    this.currentIndexSubject.next(index);
  }

  nextTrack() {
    const currentIndex = this.currentIndexSubject.value;
    const songs = this.songsSubject.value;
    if (currentIndex < songs.length - 1) {
      const newIndex = currentIndex + 1;
      this.setCurrentIndex(newIndex);
      this.playTrack(newIndex);
    }
  }

  previousTrack() {
    const currentIndex = this.currentIndexSubject.value;
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      this.setCurrentIndex(newIndex);
      this.playTrack(newIndex);
    }
  }

  playTrack(index: number) {
    const songs = this.songsSubject.value;
    if (songs && songs[index]) {
      const trackDetails = songs[index];
      this.playMusic(trackDetails.url, trackDetails);
    }
  }

  onTrackEnd = () => {
    this.nextTrack();
  };
}
