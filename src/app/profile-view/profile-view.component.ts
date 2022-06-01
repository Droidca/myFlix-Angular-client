import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UserRegistrationService } from '../fetch-api-data.service';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  username: any = localStorage.getItem('user');
  movies: any[] = [];
  favoriteMovies: any[] = [];
  displayElement: boolean = false

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.getFavoriteMovies();
  }

  // gets users data

  getUserProfile(): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.getUserInformation().subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
        return this.user;
      });
    }
  }

  //shows user favorite movies

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.favoriteMovies.push(movie);
        }
      });
    });
    console.log(this.favoriteMovies);
  }

  // allows to edit users data

  openEditUserProfile(): void {
    this.dialog.open(UserEditComponent, {
      width: '500px',
      panelClass: 'edit-user-custom',
    });
  }

  //allows to delete the user 

  deleteUserProfile(): void {
    if (confirm('Are your sure you want to delete your account? This can\'t be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account has been deleted', 'OK', {
          duration: 6000,
          verticalPosition: 'top'
        });
      });
      this.router.navigate(['welcome'])
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.clear();
      });
    }
  }

  // allows to delete a favorite movie

  deleteFavoriteMovies(MovieID: string, Title: string): void {
    this.fetchApiData.deleteFavoriteMovie(MovieID).subscribe((res: any) => {
      this.snackBar.open(`Successfully removed ${Title} from favorite movies.`, 'OK', {
        duration: 4000, verticalPosition: 'top'
      });
      setTimeout(function () {
        window.location.reload();
      }, 4000);
    });
  }
}