import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://popcorns-and-coke.herokuapp.com/';
//Get Usenrame
const username = localStorage.getItem('username');


@Injectable({
  providedIn: 'root'
})


export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // user login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails).pipe(
        catchError(this.handleError)
      );
  }

  //get all movies

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    })
      .pipe(catchError(this.handleError));
  }

  //show movie details

  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:movieId', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  //show director details

  getMovieDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/Director/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  //show genre details

  getMovieGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/Genre/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  //get user information

  getUserInformation(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  // add a movie to favorite movies list

  addFavoriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `users/${username}/movies/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  // delete movie from favorite movies list
  deleteFavoriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}/movies/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  // edit user's profile data

  editUserInformation(userData: object): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + `users/${username}`, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  // delete a user's profile

  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }



  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}