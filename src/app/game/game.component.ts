import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  constructor(){}
  count5 = [1,2,3,4,5];
  pickCardAnimation = false;

  pickCard() {
    this.pickCardAnimation = true;
  }
}

