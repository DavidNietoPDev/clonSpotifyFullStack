import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MusicPlayerService } from '../../../services/music-player.service';


@Component({
  selector: 'app-footer-left',
  templateUrl: './footer-left.component.html',
  styleUrl: './footer-left.component.css',

})
export class FooterLeftComponent {
  musicPlayer = inject(MusicPlayerService)
  @ViewChild('progressRange') progressRange: ElementRef;


  songs = [];
  currentIndex = 0;
  trackTitle = '';
  trackArtist = '';
  albumArt = '';
  currentTime = 0;
  trackDuration = 30;
  currentProgress = 0;
  currentVolume = 10;
  audioUrl = '';
  timeUpdateHandler: any;
  isPlaying = false;

  globalVolume: number = 0.1;

  ngAfterViewInit() {
    if (this.progressRange) {
      this.updateProgress();
    } else {
      console.warn('progressRange no está inicializado');
    }
  }

  ngOnInit() {
    this.musicPlayer.isPlaying$.subscribe(isPlaying => {
      this.isPlaying = isPlaying;
    });

    this.musicPlayer.trackDetails$.subscribe(details => {
      if (details) {
        this.trackTitle = details.title;
        this.trackArtist = details.artist;
        this.trackDuration = details.duration;
        this.audioUrl = details.url;
        this.albumArt = details.albumArt;
        this.currentTime = 0; // Reiniciar el tiempo actual cuando se carga una nueva pista
        this.currentProgress = 0; // Reiniciar el progreso cuando se carga una nueva pista
        if (this.musicPlayer.currentAudio) {
          this.timeUpdateHandler = () => {
            this.currentTime = this.musicPlayer.currentAudio.currentTime;
            this.currentProgress = (this.currentTime / this.trackDuration) * 100;
            this.updateProgress();
          };
          this.musicPlayer.currentAudio.addEventListener('timeupdate', this.timeUpdateHandler);
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.musicPlayer.currentAudio) {
      this.musicPlayer.currentAudio.removeEventListener('timeupdate', this.timeUpdateHandler);
    }
  }

  togglePlayBack() {
    this.musicPlayer.playMusic(this.audioUrl, {
      title: this.trackTitle,
      artist: this.trackArtist,
      duration: this.trackDuration,
      url: this.audioUrl,
      albumArt: this.albumArt
    });
  }

  nextTrack() {
    this.musicPlayer.nextTrack();
  }

  previousTrack() {
    this.musicPlayer.previousTrack();
  }

  setVolume(event: any) {
    const volume = event.target.value / 100;
    this.musicPlayer.setVolume(volume);
    this.currentVolume = event.target.value;
  }

  seekTo(event: any) {
    const seekTo = (event.target.value / 100) * this.musicPlayer.currentAudio.duration;
    this.musicPlayer.currentAudio.currentTime = seekTo;
    this.currentProgress = event.target.value;
    this.updateProgress();
  }

  updateProgress() {
    if (this.progressRange) {
      const progressValue = `${this.currentProgress}%`;
      this.progressRange.nativeElement.style.setProperty('--progress', progressValue);
    } else {
      console.warn('progressRange no está inicializado en updateProgress');
    }
  }

  ajustarVolume() {
    this.musicPlayer.setVolume(this.globalVolume);
  }

  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const secs: number = Math.floor(seconds % 60);
    return `${this.pad(minutes)}:${this.pad(secs)}`;
  }

  pad(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}
