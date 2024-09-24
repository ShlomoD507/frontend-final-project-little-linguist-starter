import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from '@angular/fire/firestore';
import { GameResult } from '../../../shared/model/game-result';

export const GameResultConverter: FirestoreDataConverter<GameResult> = {
  toFirestore: (gameResult: GameResult) => {
    return {
      idCategory: gameResult.idCategory,
      gameId: gameResult.gameId,
      date: Timestamp.fromDate(gameResult.date),
      points: gameResult.points,
      secondLeftInGame: gameResult.secondLeftInGame,
      secondsPlayed: gameResult.secondsPlayed,
    };
  },

  fromFirestore: function (
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
    options?: SnapshotOptions
  ): GameResult {
    const realData = snapshot.data(options);

    return new GameResult(
      realData['idCategory'],
      realData['gameId'],
      realData['date'].toDate(), // נדרש להמיר את התאריך מפורמט של Firestore
      realData['points'],
      realData['secondLeftInGame'],
      realData['secondsPlayed']
    );
  },
};
