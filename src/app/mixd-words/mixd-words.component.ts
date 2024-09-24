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
import { Router } from '@angular/router';
import { GameResult } from '../../shared/model/game-result';
import { GameResultService } from '../services/game-result.service';
import { GameIdEnum } from '../services/GameInfo.service';

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
  styleUrl: './mixd-words.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
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
  isLoading: boolean = true;

  currentCategory: Category = new Category(
    '',
    'fake-category',
    Language.English,
    Language.English,
    []
  );

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: MatDialog,
    private gameResultService: GameResultService,
    private router: Router
  ) {}
  navigateToChooseGame() {
    this.router.navigate(['choose-your-game']);
  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.categoriesService.get(this.id).then((category) => {
      if (category) {
        this.currentCategory = category;
        this.words = [...this.currentCategory.words].sort(
          () => Math.random() - 0.5
        );
        this.successPoints = Math.floor(
          100 / this.currentCategory.words.length
        );
        this.startNewGame();
      } else {
        console.error('Category not found.');
      }

      // this game is limited to 4 minutes
      this.timerComponent.startTimer(240);

      this.isLoading = false;
    });
  }

  mixWord(): void {
    console.log('mixing word' + this.index);
    if (this.words && this.index < this.words.length) {
      let tempMix = this.words[this.index].origin.toUpperCase();
      while (tempMix === this.words[this.index].origin.toUpperCase()) {
        tempMix = [...this.words[this.index].origin]
          .sort(() => Math.random() - 0.5)
          .join('');
      }
      this.mixedWord = [...tempMix].join(' ').toUpperCase();
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

    const isSuccess =
      currentWord.guess.toUpperCase() === currentWord.origin.toUpperCase();
    console.log('is -', currentWord.guess, currentWord.origin);
    this.endGame = this.index + 1 === this.words.length;

    if (isSuccess) {
      this.numSuccess++;
      this.gamePoints += this.successPoints;
    }

    this.index++;
    if (this.endGame) {
      // if user got the maximum points
      if (this.gamePoints === this.successPoints * this.words.length) {
        this.gamePoints = 100;
      }

      this.sendStatistics();
    } else {
      const dataToSend = new WinLoseData();
      dataToSend.isSuccess = isSuccess;
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
    return Math.floor((this.index / totalWords) * 100);
  }

  onTimerDone() {
    this.endGame = true;
    this.sendStatistics();
    alert('time is up. good luck next time');
  }

  sendStatistics() {
    const gameResult = new GameResult(
      this.id, // id קטגוריה
      GameIdEnum.MixedWords.toString(), // מזהה של המשחק
      new Date(), // תאריך המשחק
      this.gamePoints // כמות נקודות
    );

    this.gameResultService
      .addGameResult(gameResult)
      .then(() => {
        console.log('Game result saved successfully');
      })
      .catch((error) => {
        console.error('Error saving game result:', error);
      });
  }
}
