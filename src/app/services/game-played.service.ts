// import { GamePlayed } from './../../shared/model/game-played.model';
// import { Injectable } from '@angular/core';
// import { GameResultService } from './game-result.service';
// import { GameResult } from '../../shared/model/game-result';

// @Injectable({
//   providedIn: 'root'
// })
// export class GamePlayedService {
//   private readonly GAMES_KEY = 'gamesPlayed';

//   constructor(private gameResultService: GameResultService) {}

//   saveGame(game: GamePlayed): void {
//     const games = this.loadGames();
//     games.push(game);
//     localStorage.setItem(this.GAMES_KEY, JSON.stringify(games));

//     const gameResult = new GameResult(
//       game.idCategory,
//       `${game.idCategory}-${new Date().getTime()}`, // Create a unique gameId
//       new Date(),
//       game.numOfPoints
//     );

//     this.gameResultService.addGameResult(gameResult); // Save to Firestore
//   }

//   loadGames(): GamePlayed[] {
//     const gamesString = localStorage.getItem(this.GAMES_KEY);
//     const games = gamesString ? JSON.parse(gamesString) : [];
//     console.log("Loaded games:", games);  // הוספת בדיקה זו
//     return games;
// }

//   clearGames(): void {
//     localStorage.removeItem(this.GAMES_KEY);
//   }

//   getGamesByCategory(idCategory: string): GamePlayed[] {
//     return this.loadGames().filter(game => game.idCategory === idCategory);
//   }

//   getAveragePoints(): number {
//     const games = this.loadGames();
//     const totalPoints = games.reduce((sum, game) => sum + game.numOfPoints, 0);
//     return games.length ? totalPoints / games.length : 0;
//   }

// }
