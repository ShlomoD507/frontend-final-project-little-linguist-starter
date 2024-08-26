import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-exit-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './exit-button.component.html',
  styleUrl: './exit-button.component.css',
})
export class ExitButtonComponent {
  exitgame() {
    console.log('Exit game');
  }
}
