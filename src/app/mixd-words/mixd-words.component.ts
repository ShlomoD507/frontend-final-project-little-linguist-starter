import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-mixd-words',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './mixd-words.component.html',
  styleUrl: './mixd-words.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixdWordsComponent { }
