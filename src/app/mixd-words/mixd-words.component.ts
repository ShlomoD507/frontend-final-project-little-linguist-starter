import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core'; 
import { MatDialog } from '@angular/material/dialog';
import { CategoriesService } from './../services/categories.service';
import { Category } from './../../shared/model/category';
import { TranslatedWord } from '../../shared/model/translated-word';
import { TimerComponent } from '../timer/timer.component';
import { WinLoseComponent } from '../win-lose/win-lose.component';
import { ExitDialogComponent } from '../exit-dialog/exit-dialog.component';
import { GamePlayedService } from './../services/game-played.service'; 
import { GamePlayed } from '../../shared/model/game-played.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { ExitButtonComponent } from '../exit-button/exit-button.component';

@Component({
  selector: 'app-mixd-words',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    ExitButtonComponent, 
    FormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    TimerComponent,
    NgFor,
    NgIf,
  ],
  templateUrl: './mixd-words.component.html', 
  styleUrl: './mixd-words.component.css', 
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MixdWordsComponent implements OnInit {
  isLoading = true;
  @Input() id: string = '';
  words: TranslatedWord[] = [];
  index: number = -1;
  mixWord: string = '';
  numSuccess: number = 0;
  endGame: boolean = false;
  tryCount: number = 0;
  gamePoints: number = 0;
  gameDuration: number = 0;
  displayTimeLeft: string = '';

  currentCategory: Category | undefined; 
  
  @ViewChild(TimerComponent) timerComponent!: TimerComponent;
guess?:string ;

  constructor(
    private CategoriesService: CategoriesService,
    private dialogService: MatDialog,
    private gamePlayedService: GamePlayedService 
  ) {}

  ngOnInit(): void {
    const category = this.CategoriesService.get(parseInt(this.id));
    if (category) {
        this.currentCategory = category;
        this.words = this.currentCategory.words || [];
        console.log("Loaded words: ", this.words);  
        this.startNewGame();
    } else {
        console.error("Category not found.");
    }
}

  nextWord(): void {
    if (this.words && this.index < this.words.length - 1) {
        this.index++;
        this.mixWord = [...this.words[this.index].origin]
          .sort(() => Math.random() - 0.5)
          .join('');
        console.log("Current word: ", this.words[this.index]);  
    }
}

  reset(): void {
    if (this.words) this.words[this.index].guess = '';
  }

  submit(): void {
    this.tryCount++;
    const currentWord = this.words && this.words[this.index];
    const isSuccess = currentWord?.guess === currentWord?.origin;
    const isEndOfGame = this.index + 1 === this.words?.length;

    if (isSuccess) {
      this.numSuccess++;
    } else {
      this.gamePoints -= 2;
    }

    if (isEndOfGame) {
      const game: GamePlayed = {
        date: new Date(),
        idCategory: this.id,
        numOfPoints: this.gamePoints,
        secondLeftInGame: this.timerComponent.getTimeLeft(),
        secondsPlayed: this.gameDuration - this.timerComponent.getTimeLeft(),
      };
      
      this.gamePlayedService.saveGame(game);

      this.dialogService.open(WinLoseComponent, {
        data: isSuccess,
        width: '400px',
        disableClose: true
      });
    } else {
      this.nextWord();
      this.reset();
    }
  }

  startNewGame(): void {
    this.isLoading = true;
    this.index = -1;
    this.numSuccess = 0;
    this.endGame = false;
    this.tryCount = 0;
    this.gamePoints = 16;

    const category = this.CategoriesService.get(parseInt(this.id));
    if (category) {
      this.currentCategory = category;
      this.words = this.currentCategory.words || [];
      this.isLoading = false;
    } else {
      console.error("Error loading category.");
      this.isLoading = false;
    }
  }

  exitGame(): void {
    this.dialogService.open(ExitDialogComponent);
  }

  calculateProgress(): number {
    const totalWords = this.words?.length || 0;
    const guessedWordsRatio = this.numSuccess / totalWords;
    const categoryProgressRatio = this.index / totalWords;
    const progress = Math.max(guessedWordsRatio, categoryProgressRatio) * 100;
    return progress;
  }
}
