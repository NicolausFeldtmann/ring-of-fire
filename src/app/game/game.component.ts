import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  count5 = [1,2,3,4,5];
  pickCardAnimation = false;
  currentCard: string = '';
  playedCards: string = '';
  game: Game = new Game;

  constructor(public dialog: MatDialog){
  }


  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
    
  }

  pickCard() {
    if(!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() as string;
      this.pickCardAnimation = true;
      
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

    openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      this.game.players.push(name);
    });
  }

}

