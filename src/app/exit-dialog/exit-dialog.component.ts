import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exit-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogClose],
  templateUrl: './exit-dialog.component.html',
  styleUrl: './exit-dialog.component.css',
})
export class ExitDialogComponent {
  constructor(private router: Router) {}
  navigateToChooseGame() {
    this.router.navigate(['choose-your-game']);
  }
}
