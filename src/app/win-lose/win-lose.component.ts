import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';

export class WinLoseData {
  isSuccess: boolean = false;
}

@Component({
  selector: 'app-win-lose',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogClose],
  templateUrl: './win-lose.component.html',
  styleUrl: './win-lose.component.css',
})
export class WinLoseComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: WinLoseData) {
    console.log(data);
  }

  getResultMessage(): string {
    return this.data.isSuccess ? 'Correct!' : 'Wrong!';
  }

}

