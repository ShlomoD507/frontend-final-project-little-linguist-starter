import { CategoriesService } from './../services/categories.service';
import { Category } from './../../shared/model/category';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExitButtonComponent } from '../exit-button/exit-button.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mixd-words',
  standalone: true,
  imports: [
    CommonModule,RouterModule,ExitButtonComponent,FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule
  ],
  templateUrl: './mixd-words.component.html',
  styleUrl: './mixd-words.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixdWordsComponent implements OnInit{ 
isLoading = true;




  @Input()
  id=''


  currentCategory: Category | undefined;
  constructor(private CategoriesService:CategoriesService){}
  
  ngOnInit(): void {
      this.currentCategory = this.CategoriesService.get(parseInt(this.id));
  }
}
