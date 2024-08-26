import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GamePlayedService } from './../services/game-played.service'; // ייבוא השירות
import { GamePlayed } from '../../shared/model/game-played.model'; // ייבוא הממשק

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './Dashboard.component.html',
  styleUrl: './Dashboard.component.css', 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  games: GamePlayed[] = []; 

  constructor(private gamePlayedService: GamePlayedService) {}

  ngOnInit(): void {
    this.games = this.gamePlayedService.loadGames(); // טעינת המשחקים שנשמרו
  }
}
