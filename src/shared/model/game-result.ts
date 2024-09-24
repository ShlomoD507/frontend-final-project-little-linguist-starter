export class GameResult {
  constructor(
    public idCategory: string,
    public gameId: string,
    public date: Date,
    public points: number,
    public secondLeftInGame: number,
    public secondsPlayed: number
  ) {}
}