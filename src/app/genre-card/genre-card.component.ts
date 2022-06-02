import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})

export class GenreCardComponent implements OnInit {

  /**
* Data is injected from MovieCardComponent into GenreCardComponent using the MAT_DIALOG_DATA.
* @param data 
*/

  constructor(@Inject(MAT_DIALOG_DATA)
  public genre: {
    Name: string,
    Description: string,
  }
  ) { }

  ngOnInit(): void {
  }
}