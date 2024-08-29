import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WinLoseComponent } from './../win-lose/win-lose.component';

@Injectable({
  providedIn: 'root'
})
export class SortWordsDialogService {

  constructor(private dialog: MatDialog) {}

  submit(isSuccess: boolean): void {
    this.dialog.open(WinLoseComponent, {
      data: { isSuccess: isSuccess },
      disableClose: true
    });
  }
}
