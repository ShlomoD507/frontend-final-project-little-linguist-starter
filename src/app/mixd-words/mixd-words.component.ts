import {
  Component,
  OnInit,
  ViewChild,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesService } from './../services/categories.service';
import { Category } from './../../shared/model/category';
import { TranslatedWord } from '../../shared/model/translated-word';
import { TimerComponent } from '../timer/timer.component';
import { WinLoseComponent, WinLoseData } from '../win-lose/win-lose.component';
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
import { Language } from '../../shared/model/language';
import { GamePointsComponent } from '../game-points/game-points.component';
import { MatTableModule } from '@angular/material/table';

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
    GamePointsComponent,
    MatTableModule,
  ],
  templateUrl: './mixd-words.component.html',
  styleUrls: ['./mixd-words.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixdWordsComponent implements OnInit {
  @Input() id: string = '';
  @ViewChild(TimerComponent) timerComponent!: TimerComponent;
  words: TranslatedWord[] = [];
  index: number = 0;
  mixedWord: string = '';
  numSuccess: number = 0;
  endGame: boolean = false;
  successPoints: number = 0;
  gamePoints: number = 0;
  gameDuration: number = 0;
  displayTimeLeft: string = '';
  displayedColumns: string[] = ['hebrew', 'english', 'isCorrect'];

  currentCategory: Category = new Category(
    1,
    'fake-category',
    Language.English,
    Language.English,
    []
  );

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: MatDialog,
    private gamePlayedService: GamePlayedService
  ) {}

  ngOnInit(): void {
    const category = this.categoriesService.get(parseInt(this.id));
    if (category) {
      this.currentCategory = category;
      this.words = this.currentCategory.words;
      this.successPoints = Math.floor(100 / this.currentCategory.words.length);
      this.startNewGame();
    } else {
      console.error('Category not found.');
    }
  }

  mixWord(): void {
    if (this.words && this.index < this.words.length - 1) {
      console.log('mixing word');
      this.mixedWord = [...this.words[this.index].origin]
        .sort(() => Math.random() - 0.5)
        .join(' ')
        .toUpperCase();
    }
  }

  reset(): void {
    if (this.words) {
      this.words[this.index].guess = '';
    }
  }

  submit(): void {
    const currentWord = this.words[this.index];
    if (!currentWord || currentWord.guess == '') {
      console.log('submit() nothing to check');
      return;
    }

    // האם הניחוש זהה למילה המקורית
    const isSuccess =
      currentWord.guess.toUpperCase() === currentWord.origin.toUpperCase();
    console.log('is -', currentWord.guess, currentWord.origin);
    this.endGame = this.index + 1 === this.words.length;

    if (isSuccess) {
      this.numSuccess++;
      this.gamePoints += this.successPoints;
    }

    // נעבור למילה הבאה
    this.index++;

    if (this.endGame) {
      const game: GamePlayed = {
        date: new Date(),
        idCategory: this.id,
        numOfPoints: this.gamePoints,
        secondLeftInGame: this.timerComponent.getTimeLeft(),
        secondsPlayed: this.gameDuration - this.timerComponent.getTimeLeft(),
      };

      this.gamePlayedService.saveGame(game);
    } else {
      const dataToSend = new WinLoseData();
      dataToSend.isSuccess = isSuccess;

      // נציג הודעה אם המשתמש הצליח או לא
      this.dialogService.open(WinLoseComponent, {
        data: dataToSend,
      });

      this.mixWord();
      this.reset();
    }
  }

  startNewGame(): void {
    this.index = 0;
    this.numSuccess = 0;
    this.endGame = false;
    this.mixWord();
  }

  exitGame(): void {
    this.dialogService.open(ExitDialogComponent);
  }

  calculateProgress(): number {
    const totalWords = this.words?.length || 0;
    const guessedWordsRatio = this.numSuccess / totalWords;
    const categoryProgressRatio = this.index / totalWords;
    return Math.max(guessedWordsRatio, categoryProgressRatio) * 100;
  }
}
