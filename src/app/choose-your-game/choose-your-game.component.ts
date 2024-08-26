import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameProfile } from '../../shared/model/GameProfile';
import { GameInfoService } from '../services/GameInfo.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChooseCategoryComponent } from '../choose-category/choose-category.component';

@Component({
  selector: 'app-choose-your-game',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './choose-your-game.component.html',
  styleUrl: './choose-your-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseYourGameComponent implements OnInit {
  public allgames: GameProfile[] = [];

  constructor(
    private gameInfoService: GameInfoService,
    private dialogService: MatDialog
  ) {}

  ngOnInit(): void {
    this.allgames = this.gameInfoService.list();
  }

  openDialog(game: GameProfile) {
    this.dialogService.open(ChooseCategoryComponent, {
      data: game,
    });
  }
}
