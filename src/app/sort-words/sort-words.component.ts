import { Component, OnInit, Input } from '@angular/core';
import { Category } from './../../shared/model/category';
import { CategoriesService } from './../services/categories.service';
import { SortWordsDialogService } from './../services/sort-words-dialog.service'; // ייבוא השירות החדש
import { TranslatedWord } from '../../shared/model/translated-word';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterModule,Router } from '@angular/router';
import { ExitButtonComponent } from '../exit-button/exit-button.component';
import { GamePointsComponent } from '../game-points/game-points.component';


@Component({
  selector: 'app-sort-words',
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
    NgFor,
    NgIf,
    GamePointsComponent,
    MatTableModule
  ],
  templateUrl: './sort-words.component.html',
  styleUrls: ['./sort-words.component.css'],
})
export class SortWordsComponent implements OnInit {
navigateToChooseGame() {
throw new Error('Method not implemented.');
}
  @Input() id: string = '';
  currentCategory: Category | undefined;
  randomCategory: Category | undefined;
  wordPool: TranslatedWord[] = [];
  currentWordIndex: number = 0;
  userPoints: number = 0;
  wordPoints: number = 0;
  endGame: boolean = false;

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: SortWordsDialogService, // שימוש בשירות החדש
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentCategory = this.categoriesService.get(parseInt(this.id));
    if (this.currentCategory) {
      this.randomCategory = this.getRandomCategory();

      if (this.randomCategory) {
        const currentWords = this.getRandomWords(this.currentCategory, 3);
        const randomWords = this.getRandomWords(this.randomCategory, 3);

        this.wordPool = this.shuffleWords([...currentWords, ...randomWords]);

        this.wordPoints = Math.floor(100 / this.wordPool.length);
      } else {
        console.error('לא ניתן היה לבחור קטגוריה רנדומלית.');
      }
    } else {
      console.error('קטגוריה נוכחית לא נמצאה.');
    }
  }

  getRandomCategory(): Category | undefined {
    const allCategories = this.categoriesService.list();
    const filteredCategories = allCategories.filter(
      (cat) => cat.id !== this.currentCategory?.id
    );
    const randomIndex = Math.floor(Math.random() * filteredCategories.length);
    return filteredCategories[randomIndex];
  }

  getRandomWords(category: Category, count: number): TranslatedWord[] {
    return category.words.sort(() => Math.random() - 0.5).slice(0, count);
  }

  shuffleWords(words: TranslatedWord[]): TranslatedWord[] {
    return words.sort(() => Math.random() - 0.5);
  }

  onGuess(isCorrectGuess: boolean): void {
    const currentWord = this.wordPool[this.currentWordIndex];
    const isWordInCategory = this.currentCategory?.words.some(word => word.origin === currentWord.origin) || false;
    const isCorrect = isCorrectGuess === isWordInCategory;

    if (isCorrect) {
        this.userPoints += this.wordPoints;
    }
    this.dialogService.submit(isCorrect);

    this.currentWordIndex++;
    if (this.currentWordIndex >= this.wordPool.length) {
        this.endGame = true;
    }
}

  calculateProgress(): number {
    return (this.currentWordIndex / this.wordPool.length) * 100;
  }
  startNewGame(): void {
    this.ngOnInit();
  }
}
