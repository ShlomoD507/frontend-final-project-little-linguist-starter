import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-win-lose',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './win-lose.component.html',
  styleUrl: './win-lose.component.css'
})
export class WinLoseComponent {
  data?: { isSuccess: boolean };

}
