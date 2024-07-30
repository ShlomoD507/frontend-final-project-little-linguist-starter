import { CategoriesService } from './../services/categories.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injectable, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameProfile } from '../../shared/model/GameProfile';
import { GameInfoService } from '../services/GameInfo.service';

@Component({
  selector: 'app-choose-your-game',
  standalone: true,
  imports: [
    CommonModule,RouterModule,
  ],
  templateUrl: './choose-your-game.component.html',
  styleUrl: './choose-your-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseYourGameComponent implements OnInit{ 
 
  allgames : GameProfile[] = []
  
  constructor (private gameInfoService: GameInfoService) {}
  ngOnInit(): void {
    this.allgames = this.gameInfoService.list ();
}
}
