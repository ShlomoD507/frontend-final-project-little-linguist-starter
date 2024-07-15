import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-choose-your-game',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './choose-your-game.component.html',
  styleUrl: './choose-your-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseYourGameComponent { }
