import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    GameInfoComponent,
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

  games$: any;
  games: any;

  firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog){
  }


  ngOnInit(): void {
    this.newGame();
    this.games$ = collectionData(this.getGamesRef());
    this.games = this.games$.subscribe((game: any) => {
      console.log(game);
    })
  }

  newGame() {
    this.game = new Game();
  }

  pickCard() {
    if(!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() as string;
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

    openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

}

