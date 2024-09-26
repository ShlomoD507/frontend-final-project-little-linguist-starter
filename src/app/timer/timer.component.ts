import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TimerComponent {
  @Output() timerDone = new EventEmitter<void>();
  public timeForGame: number = 0;
  public secondsLeft: number = 0;
  public timerInterval: ReturnType<typeof setInterval> | null = null;

  startTimer(secondsLeft: number) {
    this.timeForGame = secondsLeft;
    this.secondsLeft = secondsLeft;
    this.timerInterval = setInterval(() => {
      this.secondsLeft--;
      if (this.secondsLeft <= 0) {
        this.timerDone.emit();
        this.stopTimer();
      }
    }, 1000);
  }

  getSecondsPlayed(): number {
    return this.timeForGame - this.secondsLeft;
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  get convertToMMSS(): string {
    const minutes = Math.floor(this.secondsLeft / 60);
    const remainedSeconds = this.secondsLeft % 60;
    return (
      minutes +
      ':' +
      (remainedSeconds < 10 ? '0' + remainedSeconds : remainedSeconds)
    );
  }
}
