import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})

export class DirectorCardComponent implements OnInit {

  /**
 * Data is injected from MovieCardComponent into DirectorCardComponent using the MAT_DIALOG_DATA.
 * @param data 
 */

  constructor(@Inject(MAT_DIALOG_DATA)
  public director: {
    Name: string,
    Bio: string,
    Birth: string,
    Death: string,
  }
  ) { }

  ngOnInit(): void {
  }
}