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

@Component({
  selector: 'app-choose-your-dialog',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './choose-your-dialog.component.html',
  styleUrl: './choose-your-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseYourDialogComponent implements OnInit {
  allgames: GameProfile[] = [];
  GameId: any;

  constructor(
    private gameInfoService: GameInfoService,
    private dialogService: MatDialog, 
  
  ) {}
  ngOnInit(): void {
    this.allgames = this.gameInfoService.list();
  }
  openDialog(){
   this.dialogService.open(ChooseYourGameComponent) 
  }
}
