import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatDialogContent,
    MatFormFieldModule,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,

  ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  name: string = '';

  onNoClick() {}
}
