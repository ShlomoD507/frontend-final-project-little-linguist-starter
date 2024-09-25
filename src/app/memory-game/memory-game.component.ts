import { Component, OnInit } from '@angular/core';
import { TranslatedWord } from '../../shared/model/translated-word'; // ייבוא המודל של מילים מתורגמות
import { CategoriesService } from '../services/categories.service'; // שירות הקטגוריות
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; // ייבוא CommonModule עבור ngFor, ngIf
import { GameResult } from '../../shared/model/game-result';
import { GameIdEnum } from '../services/GameInfo.service';
import { GameResultService } from '../services/game-result.service';
import { ExitDialogComponent } from '../exit-dialog/exit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ExitButtonComponent } from "../exit-button/exit-button.component";

@Component({
  selector: 'app-memory-game',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    ExitButtonComponent
],
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.css'],
})
export class MemoryGameComponent implements OnInit {
  words: TranslatedWord[] = []; // מילים והפירוש שלהן
  cards: {
    word: string;
    flipped: boolean;
    matched: boolean;
    direction: string;
  }[] = [];
  firstCardIndex: number | null = null;
  secondCardIndex: number | null = null;
  attempts: number = 0;
  points: number = 100;
  idCategory: string = '';
  isGameWon: boolean = false;
  
  constructor(
    private categoriesService: CategoriesService,
    private gameResultService: GameResultService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: MatDialog

  ) {}

  ngOnInit(): void {
    this.idCategory = this.route.snapshot.paramMap.get('id') || '';
    this.loadWords();
  }

  // טוען את המילים והפירושים מהקטגוריה הנבחרת ומכין את הכרטיסים
  async loadWords(): Promise<void> {
    this.isGameWon = false;
    this.firstCardIndex = null;
    this.secondCardIndex = null;
    this.attempts = 0;
    this.points = 100;
    const category = await this.categoriesService.get(this.idCategory); // המתן לקבלת הקטגוריה
    if (category) {
      this.words = category.words;
      this.cards = this.shuffleCards([...this.words]); // יצירת הכפלה למילים ולפירושים
    } else {
      console.error('Category not found');
    }
  }

  // ערבוב הכרטיסים והוספת המאפיין direction
  shuffleCards(
    pair: TranslatedWord[]
  ): { word: string; flipped: boolean; matched: boolean; direction: string }[] {
    const shuffled = [];
    console.log(pair);
    for (let index = 0; index < pair.length; index++) {
      const singlePair = pair[index];
      shuffled.push({
        word: singlePair.origin,
        flipped: false,
        matched: false,
        direction: this.getTextDirection(singlePair.origin), // קביעת כיוון הטקסט בהתאם לשפה
      });
      shuffled.push({
        word: singlePair.target,
        flipped: false,
        matched: false,
        direction: this.getTextDirection(singlePair.target), // קביעת כיוון הטקסט בהתאם לשפה
      });
    }

    const shuffledCards = shuffled.sort(() => Math.random() - 0.5); // ערבוב הכרטיסים
    console.log(shuffledCards);
    return shuffledCards;
  }

  // פונקציה להחזרת כיוון טקסט בהתאם לתוכן
  getTextDirection(text: string): string {
    const hebrewCharRange = /[\u0590-\u05FF]/;
    return hebrewCharRange.test(text) ? 'rtl' : 'ltr';
  }

  // נגיעה בכרטיס
  flipCard(index: number): void {
    if (this.firstCardIndex === null) {
      this.firstCardIndex = index;
      this.cards[index].flipped = true;
    } else if (this.secondCardIndex === null && index !== this.firstCardIndex) {
      this.secondCardIndex = index;
      this.cards[index].flipped = true;
      this.attempts++;

      setTimeout(() => {
        this.checkMatch();
      }, 1000); // השהיה של שנייה בין שתי לחיצות
    }
  }

  // בדיקה אם יש התאמה בין כרטיסים
  checkMatch(): void {
    const firstCard = this.cards[this.firstCardIndex!];
    const secondCard = this.cards[this.secondCardIndex!];

    if (
      this.words.some(
        (w) => w.origin === firstCard.word && w.target === secondCard.word
      ) ||
      this.words.some(
        (w) => w.target === firstCard.word && w.origin === secondCard.word
      )
    ) {
      // התאמה
      firstCard.matched = true;
      secondCard.matched = true;
      firstCard.flipped = true;
      secondCard.flipped = true; // השאר הכרטיסים הפוכים כשיש התאמה

      // בדיקה אם כל הכרטיסים תואמים
      this.isGameWon =  this.cards.every(card => card.matched);
      if (this.isGameWon){
        const gameResult = new GameResult(
          this.idCategory, // id קטגוריה
          GameIdEnum.MemoryGame.toString(), // מזהה של המשחק
          new Date(), // תאריך המשחק
          this.points, // כמות נקודות
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
    } else {
      // אין התאמה
      firstCard.flipped = false;
      secondCard.flipped = false;
      this.points -= 2; // הפחתת 2 נקודות על כל ניסיון כושל
    }

    this.firstCardIndex = null;
    this.secondCardIndex = null;
  }
  exitGame(): void {
    this.dialogService.open(ExitDialogComponent);
  
  }
}
