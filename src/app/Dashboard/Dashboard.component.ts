import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GamePlayedService } from './../services/game-played.service'; // ייבוא השירות
import { GamePlayed } from '../../shared/model/game-played.model'; // ייבוא הממשק
import { GameResult } from '../../shared/model/game-result';
import { GameResultService } from '../services/game-result.service';
import { CategoriesService } from '../services/categories.service';
import { GameInfoService } from '../services/GameInfo.service';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
  ],
  templateUrl: './Dashboard.component.html',
  styleUrl: './Dashboard.component.css', 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  cards = [
    { title: 'Games', value: 0 },
    { title: 'Points', value: 0 },
    { title: 'Categories learnt', value: 0 },
    { title: 'Perfect games', value: '0%' },
    { title: 'Days strike', value: 0 },
    { title: 'Games this month', value: 0 },
    { title: 'Highest score game', value: 'Unknown' } // כרטיסיה לשם המשחק עם הניקוד הגבוה ביותר
  ];

  games: GamePlayed[] = []; 
  gameResults: GameResult[] = [];
  monthlyChallengeMessage: string = '';
  constructor(private gamePlayedService: GamePlayedService,
    private gameResultService: GameResultService,
    private categoriesService: CategoriesService,
    private gameInfoService: GameInfoService
  ) {}
 
  ngOnInit(): void {
    this.loadGameResults();
    this.games = this.gamePlayedService.loadGames();
    console.log("Loaded games:", this.games); // הוסף בדיקה זו
    this.loadStats();
}

  async loadStats() {
    const games = this.gamePlayedService.loadGames();
    const categories = await this.categoriesService.list();

    this.cards[0].value = games.length; // מספר משחקים
    this.cards[1].value = this.calculateTotalPoints(games); // כמות נקודות
    this.cards[2].value = categories.length; // קטגוריות שנלמדו
    this.cards[3].value = this.calculatePerfectGames(games) + '%'; // אחוזי הצלחה מושלמת
    this.cards[4].value = this.calculateDaysStrike(); // ימים ברצף
    this.cards[5].value = this.calculateMonthlyGames(games); // משחקים ששוחקו החודש
    this.cards[6].value = this.findHighestScoreGame(games); // שם המשחק עם הניקוד הגבוה ביותר

  }

  calculateTotalPoints(games: GamePlayed[]): number {
    return games.reduce((sum, game) => sum + game.numOfPoints, 0);
  }

  calculatePerfectGames(games: GamePlayed[]): number {
    const perfectGames = games.filter(game => game.numOfPoints === 100); // ניקוד מקסימלי
    return games.length ? (perfectGames.length / games.length) * 100 : 0;
  }
  calculateDaysStrike(): number {
    // חישוב ימים רצופים בהם שיחקו
    let strike = 0;
    let lastPlayedDay: number | null = null;
  
    if (this.games.length === 0) {
      return 0; // אם אין משחקים, אין רצף
    }
  
    this.games.forEach(game => {
      const gameDay = new Date(game.date).getDate();
  
      if (lastPlayedDay === null || gameDay === lastPlayedDay - 1) {
        // אם זה היום הראשון או יום רצוף
        strike++;
      } else if (gameDay !== lastPlayedDay) {
        // אם זה לא רצף (היה יום שלא שיחקו בו), לא נעלה את strike
        strike = 1;
      }
      lastPlayedDay = gameDay; // עדכון היום האחרון ששיחקו בו
    });
  
    return strike;
  }
  

calculateMonthlyGames(games: GamePlayed[]): number {
    const currentMonth = new Date().getMonth();
    return games.filter(game => new Date(game.date).getMonth() === currentMonth).length;
  }

findHighestScoreGame(games: GamePlayed[]): string {
    if (games.length === 0) return 'No games played';

    const highestScoreGame = games.reduce((prev, current) =>
      prev.numOfPoints > current.numOfPoints ? prev : current
    );

    const gameProfile = this.gameInfoService.list().find(
      game => game.GameId === Number(highestScoreGame.idCategory) // המרת idCategory למספר
    );

    return gameProfile ? gameProfile.GameName : 'Unknown game';
}
  // חישוב אתגר חודשי
  calculateMonthlyChallenge(games: GamePlayed[]): { playedThisMonth: number, remainingGames: number, message: string } {
    const currentMonth = new Date().getMonth();
    const gamesThisMonth = games.filter(game => new Date(game.date).getMonth() === currentMonth).length;
    const remainingGames = 20 - gamesThisMonth;

    let message;
    if (remainingGames > 0) {
      message = `You need to play ${remainingGames} more games to complete the monthly challenge!`;
    } else {
      message = `Congratulations! You've completed the monthly challenge!`;
    }

    return { playedThisMonth: gamesThisMonth, remainingGames: remainingGames > 0 ? remainingGames : 0, message };
  }

  // טעינת תוצאות משחקים
  async loadGameResults() {
    this.gameResults = await this.gameResultService.getAllGameResults();
  }

  
}



