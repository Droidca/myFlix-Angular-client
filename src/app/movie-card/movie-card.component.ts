import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(public fetchApiData: UserRegistrationService, public dialog: MatDialog, public snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openDirectorDialog(name: string, bio: string, birth: string, death: string,): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death,
      },
      width: '500px',
    });
    console.log(name)
  }

  openGenreDialog(name: string, description: string,): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
    });
    console.log(name)
  }

  openSynopsisDialog(description: string,): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Description: description,
      },
      width: '500px',
    });
    console.log(description)
  }

  addFavorite(id: string, Title: string): void {
    console.log(id);
    const token = localStorage.getItem('token');
    console.log(token)
    this.fetchApiData.addFavoriteMovie(id).subscribe((resp: any) => {
      this.snackBar.open(`Successfully added ${Title} to favorite movies.`, 'OK', {
        duration: 4000,
        verticalPosition: 'top'
      });
      console.log(resp)
      this.ngOnInit();
    });
  }
}