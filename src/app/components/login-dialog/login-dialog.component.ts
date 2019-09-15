import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {HTTP_ERROR} from '../../models/Error';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  public isWaiting = false;

  public form = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
    password: ['', Validators.required ],
  });

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private userService: UserService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<LoginDialogComponent>) { }

  ngOnInit() {
  }

  public async submit() {
    if (this.form.invalid) {
      return;
    }

    this.isWaiting = true;

    try {
      const user = await this.userService.login(this.form.value.email, this.form.value.password);
      this.dialogRef.close({ type: 'SUCCESS', user });

    } catch (e) {

      if (e === HTTP_ERROR.NOT_FOUNDED) {
        this.snackBar.open('Oops! A user with this email not found.', 'close', { duration: 3000 });
      } else {
        this.snackBar.open('Oops! Has Something wrong.', 'ok', { duration: 3000 });
      }

    } finally {
      this.isWaiting = false;
    }

  }

}
