import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sort-words',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './sort-words.component.html',
  styleUrl: './sort-words.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortWordsComponent { }
