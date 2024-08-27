import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-points',
  standalone: true,
  imports: [],
  templateUrl: './game-points.component.html',
  styleUrl: './game-points.component.css',
})
export class GamePointsComponent {
  @Input() public points: number = 0;
}
