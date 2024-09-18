import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CategoriesService } from './../services/categories.service';
import { Category } from './../../shared/model/category';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TriviaComponent implements OnInit {
  @Input()
  id = '';

  currentCategory: Category | undefined;
  constructor(private CategoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.CategoriesService.get(this.id).then((reslt) => {
      this.currentCategory = reslt;
    });
  }
}
