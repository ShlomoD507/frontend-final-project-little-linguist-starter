import { GamePlayed } from './../../shared/model/game-played.model';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GamePlayedService {
  private readonly GAMES_KEY = 'gamesPlayed';

  constructor() {}


  saveGame(game: GamePlayed): void {
    const games = this.loadGames();
    games.push(game);
    localStorage.setItem(this.GAMES_KEY, JSON.stringify(games));
  }


  loadGames(): GamePlayed[] {
    const gamesString = localStorage.getItem(this.GAMES_KEY);
    return gamesString ? JSON.parse(gamesString) : [];
  }


  clearGames(): void {
    localStorage.removeItem(this.GAMES_KEY);
  }


  getGamesByCategory(idCategory: string): GamePlayed[] {
    return this.loadGames().filter(game => game.idCategory === idCategory);
  }


  getAveragePoints(): number {
    const games = this.loadGames();
    const totalPoints = games.reduce((sum, game) => sum + game.numOfPoints, 0);
    return games.length ? totalPoints / games.length : 0;
  }
}
