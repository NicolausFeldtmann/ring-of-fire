import { Component, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  firestore: Firestore = inject(Firestore)

  constructor(private router: Router) {

  }

  newGame(){
    let game = new Game();
    let gamesCol = collection(this.firestore, 'games');

    addDoc(gamesCol, game.toJson()).then((gameInfo) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    })
  }
}
