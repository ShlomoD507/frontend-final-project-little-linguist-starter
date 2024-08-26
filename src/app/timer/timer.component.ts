import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {  EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './timer.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TimerComponent implements OnInit, OnDestroy {
  @Input() duration: number = 0; 
  @Output() timeUp = new EventEmitter<void>(); 
  @Output() reportTimeLeft = new EventEmitter<number>(); 

  timeLeft: number = 0; 
  private intervalId: number | undefined; 

  ngOnInit(): void {
    this.startTimer(); 
  }

  startTimer() {
    this.timeLeft = this.duration;
    this.intervalId = window.setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.reportTimeLeft.emit(this.timeLeft);
      } else {
        this.timeUp.emit();
        clearInterval(this.intervalId);
      }
    }, 1000); 
  }

  getTimeLeft(): number {
    return this.timeLeft; 
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); 
  }
}