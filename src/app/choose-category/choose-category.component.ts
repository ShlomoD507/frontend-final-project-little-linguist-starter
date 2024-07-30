import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { GameInfoService } from '../services/GameInfo.service';
import { GameProfile } from '../../shared/model/GameProfile';
import { MatButtonModule } from '@angular/material/button';
import { ChooseYourGameComponent } from '../choose-your-game/choose-your-game.component';
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
  public GameId: any;
  public allCategories: Category[] = [];
  public selectedCategory: Category | undefined;

  constructor(
    private dialogService: MatDialog,
    private categoryService: CategoriesService
  ) {

  }
  ngOnInit(): void {
    this.allCategories = this.categoryService.list();
  }
  openDialog() {
    this.dialogService.open(ChooseYourGameComponent);
  }
}
