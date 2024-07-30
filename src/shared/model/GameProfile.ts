export class GameProfile {
  GameId: number;
  GameName: string;
  GameDescription: string;
  GameURL: string;
name: any;

  constructor(
    GameId: number,
    GameName: string,
    GameDescription: string,
    GameURL: string
  ) {
    this.GameId = GameId;
    this.GameName = GameName;
    this.GameDescription = GameDescription;
    this.GameURL = GameURL;
  }
}
