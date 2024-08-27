import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-exit-dialog',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './exit-dialog.component.html',
  styleUrl: './exit-dialog.component.css',
})
export class ExitDialogComponent {}
