import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/GameProfile';

@Injectable({
  providedIn: 'root',
})
export class GameInfoService {
  private allgames = [
    new GameProfile(
      1,
      'Sort word',
      'Sort words in the correct order, such as alphabetically or by specific categories',
      'sort-words'
    ),
    new GameProfile(
      2,
      'Mixed words',
      'Practice spelling,by finding the right order of letters for every word in the category',
      'mixd-words'
    ),
    new GameProfile(
      3,
      'Trivia',
      'choose every words translation from a list of 4 options',
      'trivia'
    ),
  new GameProfile(
    4,
    'Memory Game',
    'Match the words with their translations to win',
    'memory-game' // השם של הנתיב של המשחק
  ),
];

list(): GameProfile[] {
  return this.allgames;
}

  constructor() {}
}









