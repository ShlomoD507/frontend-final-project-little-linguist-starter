import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/GameProfile';

@Injectable({
  providedIn: 'root',
})
export class GameInfoService {
  private allgames = [
    new GameProfile(1, 'Sort word', 'Generate the game description', 'sort-words'),
    new GameProfile(2, 'mixd words', 'Practice spelling,by finding the right order of letters for every word in the category', 'mixd-words'),
    new GameProfile(3, 'Trivia', 'choose every words translation from a list of 4 options', 'trivia'),
  ];

  list(): GameProfile[] {
    return this.allgames;
  }

  constructor() {}
}
