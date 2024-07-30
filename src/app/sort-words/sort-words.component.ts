import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriesService } from './../services/categories.service';
import { Category } from './../../shared/model/category';
@Component({
  selector: 'app-sort-words',
  standalone: true,
  imports: [
    CommonModule,RouterModule,
  ],
  templateUrl: './sort-words.component.html',
  styleUrl: './sort-words.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

 export class SortWordsComponent implements OnInit{ 
  @Input()
  id=''

  currentCategory: Category | undefined;
  constructor(private CategoriesService:CategoriesService){}
  
  ngOnInit(): void {
      this.currentCategory = this.CategoriesService.get(parseInt(this.id));
  }
}



