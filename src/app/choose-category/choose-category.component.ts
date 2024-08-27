import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { GameProfile } from '../../shared/model/GameProfile';
import { MatButtonModule } from '@angular/material/button';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../../shared/model/category';

@Component({
  selector: 'app-choose-category',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './choose-category.component.html',
  styleUrl: './choose-category.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseCategoryComponent implements OnInit {
  public GameId?: Category;
  public allCategories: Category[] = [];
  public selectedCategory: Category | undefined;

  constructor(
    private categoryService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public selectedGame: GameProfile,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.allCategories = this.categoryService.list();
  }
  openDialog() {
    if (this.selectedCategory == undefined) {
      alert('choose category!');
    } else {
      const gameUrl = this.selectedGame.GameURL;
      const categoryId = this.selectedCategory?.id;
      this.router.navigate([gameUrl, categoryId]);
    }
  }
}
