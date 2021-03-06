import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  Username = localStorage.getItem('user');
  user: any = {};

  @Input() userData = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday
  }

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserEditComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  /**
   * gets the users data
   * @function getUserInformation
   * @returns the data of currently logged user is available
   */

  getUserProfile(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUserInformation().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user)
    });
  }

  /**
   * updates the user's data in database
   * displays a message for successfully updated profile
   * reloads the page
   * @function editUserInformation
   * @returns a users updated data
   */

  editUserProfile(): void {
    this.fetchApiData.editUserInformation(this.userData).subscribe((resp) => {
      this.dialogRef.close();
      localStorage.setItem('user', resp.Username);
      this.snackBar.open('Your profile has been updated successfully.', 'OK', {
        duration: 2000,
        verticalPosition: 'top'
      });
      setTimeout(() => {
        window.location.reload();
      });
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}