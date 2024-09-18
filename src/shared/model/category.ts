import { Language } from './language';
import { TranslatedWord } from './translated-word';

export class Category {
  name: string;
  id: string;
  lastUpdateDate = new Date();
  target: Language;
  origin: Language;
  words: TranslatedWord[] = [];

  constructor(
    id: string,
    name: string,
    origin: Language,
    target: Language,
    words: TranslatedWord[]
  ) {
    this.name = name;
    this.id = id;
    this.lastUpdateDate = new Date();
    this.target = target;
    this.origin = origin;
    this.words = words;
  }
}
