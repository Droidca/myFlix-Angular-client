import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-card',
  templateUrl: './synopsis-card.component.html',
  styleUrls: ['./synopsis-card.component.scss']
})
export class SynopsisCardComponent implements OnInit {

  /**
 * Data is injected from MovieCardComponent into SynopsisCardComponent using the MAT_DIALOG_DATA.
 * @param data
 */

  constructor(@Inject(MAT_DIALOG_DATA)
  public synopsis: {
    Description: string,
  }
  ) { }

  ngOnInit(): void {
  }
}
