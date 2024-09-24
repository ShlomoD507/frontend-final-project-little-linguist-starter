import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameResult } from '../../shared/model/game-result';
import { GameResultService } from '../services/game-result.service';
import { CategoriesService } from '../services/categories.service';
import { GameInfoService } from '../services/GameInfo.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './Dashboard.component.html',
  styleUrl: './Dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DashboardComponent implements OnInit {
  cards = [
    { title: 'Total Games', value: 0 },
    { title: 'Total Points', value: 0 },
    { title: 'Categories learnt', value: 0 },
    { title: 'Categories NOT learnt', value: 0 },
    { title: 'Categories learnt precent', value: 0 },
    { title: 'Perfect games', value: '0%' },
    { title: 'Days strike', value: 0 },
    { title: 'Games this month', value: 0 },
    { title: 'Highest score game', value: '-' }, // כרטיסיה לשם המשחק עם הניקוד הגבוה ביותר
  ];

  gameResults: GameResult[] = [];
  monthlyChallengeGamesNeeded: number = 20;

  constructor(
    private gameResultService: GameResultService,
    private categoriesService: CategoriesService,
    private gameInfoService: GameInfoService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadGameResults().then(() => {
      console.log('Loaded gameResults:', this.gameResults); // הוסף בדיקה זו
      this.loadStats();
    });
  }

  async loadStats(): Promise<void> {
    const categories = await this.categoriesService.list();


    let categoriesLernt = 0;
    categories.forEach(c => {
      if (this.gameResults.filter(gr => gr.idCategory == c.id).length > 0){
        categoriesLernt++;
      }
    });

    const monthlyGames = this.calculateMonthlyGames(this.gameResults); // משחקים ששוחקו החודש
    this.monthlyChallengeGamesNeeded = this.calculateMonthlyChallenge(this.gameResults);

    this.cards[0].value = this.gameResults.length; // מספר משחקים
    this.cards[1].value = this.calculateTotalPoints(this.gameResults); // כמות נקודות
    this.cards[2].value = categoriesLernt; // קטגוריות שנלמדו
    this.cards[3].value = categories.length - categoriesLernt;
    this.cards[4].value = Math.round((categoriesLernt / categories.length) * 100) + '%';
    this.cards[5].value = this.calculatePerfectGames(this.gameResults) + '%'; // אחוזי הצלחה מושלמת
    this.cards[6].value = this.calculateDaysStrike(); // ימים ברצף
    this.cards[7].value = monthlyGames;
    this.cards[8].value = this.findHighestScoreGame(this.gameResults); // שם המשחק עם הניקוד הגבוה ביותר
  }

  calculateTotalPoints(games: GameResult[]): number {
    return games.reduce((sum, game) => sum + game.points, 0);
  }

  calculatePerfectGames(games: GameResult[]): number {
    const perfectGames = games.filter((game) => game.points === 100); // ניקוד מקסימלי
    return games.length ? Math.round((perfectGames.length / games.length) * 100) : 0;
  }

  calculateDaysStrike(): number {
    // calculate strike days starting from today going back
    let daysStrike = 0;
    let foundGameDay = true;
    const currentDate = new Date();
    for (let index = 0; index < 100 && foundGameDay; index++) {
      foundGameDay = this.isPlayedOnDate(currentDate);
      if (foundGameDay) {
        daysStrike++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return daysStrike;
  }

  calculateMonthlyGames(games: GameResult[]): number {
    const currentMonth = new Date().getMonth();
    return games.filter(
      (game) => new Date(game.date).getMonth() === currentMonth
    ).length;
  }

  findHighestScoreGame(games: GameResult[]): string {
    if (games.length === 0) {
      return 'No games played';
    }

    const highestScoreGame = games.reduce((prev, current) =>
      prev.points > current.points ? prev : current
    );

    const gameProfile = this.gameInfoService.list().find(
      (game) => game.GameId === Number(highestScoreGame.gameId) // המרה למספר
    );

    return gameProfile ? gameProfile.GameName : 'Unknown game';
  }

  // חישוב אתגר חודשי
  calculateMonthlyChallenge(games: GameResult[]): number
  {
    const gamesThisMonth = this.calculateMonthlyGames(games);
    const remainingGames = 20 - gamesThisMonth;

    return remainingGames;

    // if (remainingGames > 0) {
    //   message = `You need to play ${remainingGames} more games to complete the monthly challenge!`;
    // } else {
    //   message = `Congratulations! You've completed the monthly challenge!`;
    // }
  }

  // טעינת תוצאות משחקים
  async loadGameResults(): Promise<void> {
    this.gameResults = await this.gameResultService.list();
  }

  isPlayedOnDate(currentDate: Date): boolean {
    const gamesOnDate = this.gameResults.filter(
      (game) =>
        new Date(game.date).toDateString() === currentDate.toDateString()
    );

    return gamesOnDate.length > 0;
  }
}
