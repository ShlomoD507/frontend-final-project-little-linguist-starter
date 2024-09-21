import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, QuerySnapshot, CollectionReference, } from '@angular/fire/firestore';
import { GameResult } from '../../shared/model/game-result';
import { GameResultConverter } from './converter/game-result-converter';


@Injectable({
  providedIn: 'root',
})
export class GameResultService {
  getAllGameResults(): GameResult[] | PromiseLike<GameResult[]> {
    throw new Error('Method not implemented.');
  }
  private readonly GAME_RESULT_COLLECTION = 'gameResults'; // שם האוסף ב-Firestore
  private gameResultCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.gameResultCollection = collection(this.firestore, this.GAME_RESULT_COLLECTION);
  }

  async addGameResult(result: GameResult): Promise<void> {
    const gameResultCollection = collection(this.firestore, this.GAME_RESULT_COLLECTION).withConverter(GameResultConverter);
    await addDoc(gameResultCollection, result);
  }

  async list(): Promise<GameResult[]> {
    const gameResultCollection = collection(this.firestore, this.GAME_RESULT_COLLECTION).withConverter(GameResultConverter);
    const querySnapshot: QuerySnapshot<GameResult> = await getDocs(gameResultCollection);
    return querySnapshot.docs.map((doc) => doc.data());
  }


}










