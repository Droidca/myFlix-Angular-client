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

  /**
 * gets a list of all movies from the Api endpoint
 * @function getAllMovies
 */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
 * opens the dialog box with information about the movies director
 * @param name {string}
 * @param bio {string}
 * @param birth {string}
 * @param death {string}
 */

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

  /**
* opens the dialog box with information about the movies genre
* @param name {string}
* @param description {string}
*/

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

  /**
* opens the dialog box with information about the movies description
* @param description {string}
*/

  openSynopsisDialog(description: string,): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Description: description,
      },
      width: '500px',
    });
    console.log(description)
  }

  /**
 * Add a movie to user's favorites
 * @function addFavoriteMovie
 * @param id {string}
 * @param Title {string}
 * @returns an array of the movie object in json format
 */

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