import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://popcorns-and-coke.herokuapp.com/';
//Get Usenrame
const username = localStorage.getItem('user');


@Injectable({
  providedIn: 'root'
})


export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  /**
 * Making the api call for the user registration endpoint
 * @param userDetails {any}
 * @returns a new user object
 */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * calls API endpoint to user login
   * @param userDetails {any}
   * @returns user's data
   */

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * calls API end-point to get all movies
   * @returns array of all movies
   */

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

  /**
   * calls API end-point to get a single movie
   * @returns a single movie
   */

  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:movieId', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  /**
   * calls API end-point to get data about a director by name
   * @returns a director's data
   */

  getMovieDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  /**
   * calls API end-point to get data about a genre by name
   * @returns a genre's data
   */

  getMovieGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/Genre/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  /**
   * calls API end-point to get a logged in user's data
   * @returns user's data
   */

  getUserInformation(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  /**
   * calls API end-point to add a movie to the user's favorites
   * @param MovieID {string}
   * @returns the updated user's list of favorite movies
   */

  addFavoriteMovie(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `users/${username}/movies/${MovieID}`, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  /**
   * calls API end-point to remove a movie from user's favorites
   * @param id {string}
   * @returns the updated user's list of favorite movies
   */

  deleteFavoriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}/movies/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  /**
   * calls API end-point to edit a user's data
   * @param userData {object}
   * @returns user's updated data
   */

  editUserInformation(userData: object): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + `users/${username}`, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  /**
   * calls API end-point to delete the current user from database
   * @returns delete status
   */

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