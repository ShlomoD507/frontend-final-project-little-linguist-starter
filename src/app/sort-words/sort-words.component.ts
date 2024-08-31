import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from './../../shared/model/category';
import { CategoriesService } from './../services/categories.service';
import { SortWordsDialogService } from './../services/sort-words-dialog.service';
import { MatDialog } from '@angular/material/dialog'; 
import { ExitDialogComponent } from '../exit-dialog/exit-dialog.component'; 
import { TranslatedWord } from '../../shared/model/translated-word';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ExitButtonComponent } from '../exit-button/exit-button.component';
import { GamePointsComponent } from '../game-points/game-points.component';
import { Language } from '../../shared/model/language';

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
    MatTableModule,
  ],
  templateUrl: './sort-words.component.html',
  styleUrls: ['./sort-words.component.css'],
})
export class SortWordsComponent implements OnInit {
  @Input() id: string = '';
  currentCategory: Category;
  randomCategory: Category;
  wordPool: TranslatedWord[] = [];
  currentPoolIndex: number = 0;
  userPoints: number = 0;
  wordPoints: number = 0;
  endGame: boolean = false;

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: SortWordsDialogService,
    private dialog: MatDialog, // הוספת MatDialog לשימוש ב-Exit Dialog
    private router: Router
  ) {
    this.currentCategory = new Category(
      -1,
      'fake-category',
      Language.English,
      Language.Hebrew,
      []
    );
    this.randomCategory = this.currentCategory;
  }

  navigateToChooseGame() {
    this.router.navigate(['choose-your-game']);
  }

  ngOnInit(): void {
    const selectedCateogry = this.categoriesService.get(parseInt(this.id));

    if (selectedCateogry) {
      this.currentCategory = selectedCateogry;
      this.randomCategory = this.getRandomCategory();

      const currentWords = this.getRandomWords(this.currentCategory);
      const randomWords = this.getRandomWords(this.randomCategory);

      this.wordPool = this.shuffleWords([...currentWords, ...randomWords]);

      this.wordPoints = Math.floor(100 / this.wordPool.length);
    } else {
      console.error('קטגוריה נוכחית לא נמצאה.');
    }
  }

  getRandomCategory(): Category {
    const allCategories = this.categoriesService.list();
    const filteredCategories = allCategories.filter(
      (cat) => cat.id !== this.currentCategory?.id
    );
    const randomIndex = Math.floor(Math.random() * filteredCategories.length);
    return filteredCategories[randomIndex];
  }

  getRandomWords(category: Category): TranslatedWord[] {
    return category.words.sort(() => Math.random() - 0.5);
  }

  shuffleWords(words: TranslatedWord[]): TranslatedWord[] {
    return words.sort(() => Math.random() - 0.5);
  }

  isWordInCurrentCateogry(word: string) {
    const isWordInCategory = this.currentCategory.words.some(
      (trasnlatedWord) =>
        trasnlatedWord.origin.toLowerCase() === word.toLowerCase()
    );
    return isWordInCategory;
  }

  isGuessCorrect(word: string, guess: string) {
    const isInCategory = this.isWordInCurrentCateogry(word);
    const isCorrect =
      (guess === 'Yes' && isInCategory) || (guess === 'No' && !isInCategory);
    return isCorrect;
  }

  onGuess(guess: boolean): void {
    const currentTranslatedWord = this.wordPool[this.currentPoolIndex];
    currentTranslatedWord.guess = guess ? 'Yes' : 'No';

    console.log(this.wordPool);
    console.log(currentTranslatedWord);
    const isCorrect = this.isGuessCorrect(
      currentTranslatedWord.origin,
      currentTranslatedWord.guess
    );
    if (isCorrect) {
      this.userPoints += this.wordPoints;
    }

    this.dialogService.submit(isCorrect);

    this.currentPoolIndex++;

    if (this.currentPoolIndex >= this.wordPool.length) {
      this.endGame = true;
    }
  }

  calculateProgress(): number {
    return (this.currentPoolIndex / this.wordPool.length) * 100;
  }

  startNewGame(): void {
    this.ngOnInit(); // אתחול מחדש של המשחק
  }

  // פונקציה לפתיחת דיאלוג יציאה
  exitGame(): void {
    const dialogRef = this.dialog.open(ExitDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // או התנאי הנכון שגורם ליציאה מהמשחק
        this.router.navigate(['choose-your-game']);
      }
    });
  }
}
