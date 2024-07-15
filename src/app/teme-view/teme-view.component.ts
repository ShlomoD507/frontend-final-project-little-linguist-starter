import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-teme-view',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './teme-view.component.html',
  styleUrl: './teme-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemeViewComponent { }
