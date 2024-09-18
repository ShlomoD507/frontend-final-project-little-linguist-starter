import { Category } from './../../shared/model/category';
import { Injectable } from '@angular/core';

import {
  addDoc,
  collection,
  Firestore,
  getDocs,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  QuerySnapshot,
} from '@angular/fire/firestore';
import { CategoryConverter } from './converter/category-converter';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly CATEGORY_KEY = 'categories';

  constructor(private firestore: Firestore) {}

  // Angular = TS objects <=> firestore = { } JSON
  async list(): Promise<Category[]> {
    const connection = collection(
      this.firestore,
      this.CATEGORY_KEY
    ).withConverter(CategoryConverter);

    const query: QuerySnapshot<Category> = await getDocs(connection);
    const result: Category[] = [];
    query.forEach((doc) => {
      const category = doc.data();
      result.push(category);
    });

    return result;
  }

  async get(id: string): Promise<Category | undefined> {
    const docRef = doc(this.firestore, this.CATEGORY_KEY, id).withConverter(
      CategoryConverter
    );

    // fake sleep of 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return (await getDoc(docRef)).data();
  }

  async add(newcategoryData: Category): Promise<void> {
    const connection = collection(
      this.firestore,
      this.CATEGORY_KEY
    ).withConverter(CategoryConverter);
    await addDoc(connection, newcategoryData);
  }

  async update(existingcategory: Category): Promise<void> {
    const docRef = doc(
      this.firestore,
      this.CATEGORY_KEY,
      existingcategory.id
    ).withConverter(CategoryConverter);

    existingcategory.lastUpdateDate = new Date();
    await setDoc(docRef, existingcategory);
  }

  async delete(existingcategoryId: string): Promise<void> {
    const docRef = doc(this.firestore, this.CATEGORY_KEY, existingcategoryId);
    await deleteDoc(docRef);
  }
}
