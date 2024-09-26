import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/GameProfile';

export enum GameIdEnum {
  SortWords = 1,
  MixedWords = 2,
  Trivia = 3,
  MemoryGame = 4,
}

@Injectable({
  providedIn: 'root',
})
export class GameInfoService {
  private allgames = [
    new GameProfile(
      GameIdEnum.SortWords,
      'Sort word',
      'Sort words in the correct order, such as alphabetically or by specific categories',
      'sort-words'
    ),
    new GameProfile(
      GameIdEnum.MixedWords,
      'Mixed words',
      'Practice spelling,by finding the right order of letters for every word in the category',
      'mixd-words'
    ),
    new GameProfile(
      GameIdEnum.Trivia,
      'Trivia',
      'choose every words translation from a list of 4 options',
      'trivia'
    ),
    new GameProfile(
      GameIdEnum.MemoryGame,
      'Memory Game',
      'Match the words with their translations to win',
      'memory-game'
    ),
  ];

  list(): GameProfile[] {
    return this.allgames;
  }

  constructor() {}
}
