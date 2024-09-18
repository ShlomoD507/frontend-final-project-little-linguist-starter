import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@angular/fire/firestore';
import { Category } from '../../../shared/model/category';
import { Language } from '../../../shared/model/language';

export const CategoryConverter: FirestoreDataConverter<Category> = {
  toFirestore: (category: Category) => {
    const words = Object.entries(category.words).map(([, trasnaltedWord]) => ({
      origin: trasnaltedWord.origin,
      target: trasnaltedWord.target,
    }));
    return {
      name: category.name,
      lastUpdateDate: category.lastUpdateDate,
      target: category.target,
      origin: category.origin,
      words: words,
    };
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
    options?: SnapshotOptions
  ): Category {
    const realData = snapshot.data(options);

    const targetLang = <Language>realData['target'];
    const originLang = <Language>realData['origin'];

    const res = new Category(
      snapshot.id,
      realData['name'],
      originLang,
      targetLang,
      realData['words']
    );

    res.lastUpdateDate = new Date(realData['lastUpdateDate'].toDate());
    return res;
  },
};
