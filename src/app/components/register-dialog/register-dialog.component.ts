import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {HTTP_ERROR} from "../../models/Error";


export const Equals = (control: string) => {
  return (group: FormGroup) => {
    const password = group.controls.password.value;
    const passwordConfirmation = group.controls[control].value;

    return password === passwordConfirmation ? null : { notEqual: true };
  };
};


@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  public isWaiting = false;

  public form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
    phone: ['', Validators.required ],
    password: ['', Validators.required ],
  });

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private userService: UserService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<RegisterDialogComponent>) { }

  ngOnInit() {
  }

  public async submit() {
    if (this.form.invalid) {
      return;
    }

    this.isWaiting = true;

    try {
      await this.userService.create(this.form.getRawValue());
      this.snackBar.open('Your account are created!', null, { duration: 3000 });
      this.dialogRef.close('ACCOUNT_CREATED');

    } catch (e) {

      if (e === HTTP_ERROR.DUPLICATED) {
        this.snackBar.open('Oops! A user with this email already registered.', 'close', { duration: 3000 });
      } else {
        this.snackBar.open('Oops! Has Something wrong.', 'ok', { duration: 3000 });
      }

    } finally {
      this.isWaiting = false;
    }

  }

}
