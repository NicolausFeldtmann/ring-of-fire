import { Component, Input, OnChanges } from '@angular/core';
import { MatCardModule, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [
    MatCardModule,
  ],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss'
})
export class GameInfoComponent implements OnChanges {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Rhyme', description: ' Pick a word such as fog and the person next to you must rhyme with fog, like dog, and it goes to the next person and the next, in a circle, until someone messes up and he or she will have to drink.' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Make a Rule', description: 'You can make up any rule that everyone has to follow, such as you can only drink with your left hand. Everyone (including you) must follow this rule for the whole entire game and if you disobey you must drink.' },
    { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  title = '';
  description = '';
  @Input() card: any;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    if(this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}
