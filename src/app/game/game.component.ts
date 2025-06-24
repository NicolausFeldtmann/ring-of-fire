import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';



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
  gameId: any;

  firestore: Firestore = inject(Firestore);

  constructor(private rout: ActivatedRoute, public dialog: MatDialog){
  }


  ngOnInit(): void {
    //this.newGame();
    this.rout.params.subscribe((params) => {
      console.log(params['id']);
      this.gameId = params['id'];
      this.games$ = collectionData(this.getGamesRef());
      this.games = this.games$.subscribe((gamesArray: any[]) => {
        if (gamesArray.length > 0) {
          let gameFromDb = gamesArray[0];
          this.game.currentPlayer = gameFromDb.currentPlayer;
          this.game.playedCards = gameFromDb.playedCards;
          this.game.players = gameFromDb.players;
          this.game.stack = gameFromDb.stack;
        }
      })
    });
  }

  newGame() {
    this.game = new Game();
  }

  pickCard() {
    if(!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() as string;
      this.pickCardAnimation = true;
      this.saveGame();

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

    openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  saveGame() {
    let gameRef = doc(this.firestore, 'games', this.gameId);
    updateDoc(gameRef, this.game.toJson());
  }
}

