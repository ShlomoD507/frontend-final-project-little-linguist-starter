import { WinLoseComponent } from './../win-lose/win-lose.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslatedWord } from '../../shared/model/translated-word';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  words: TranslatedWord[] = [];
  index: number = 0;

  constructor(private dialog: MatDialog) {}

  submit() {
    const currentWord = this.words ? this.words[this.index] : undefined;
    const isSuccess = currentWord?.['guess'] === currentWord?.['origin'];
    
    this.dialog.open(WinLoseComponent, {
      data: { isSuccess },
      disableClose: true
    });
  }
}

