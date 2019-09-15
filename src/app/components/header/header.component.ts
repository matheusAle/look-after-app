import {Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../../models/User.model';
import {UserService} from '../../services/user.service';

export const USER_KEY = 'USER_STORAGE';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() hasUser: boolean;
  public user: User;

  constructor(public dialog: MatDialog, private router: Router, private userService: UserService) { }

  async ngOnInit() {
    const storageUser = localStorage.getItem(USER_KEY);
    if (!storageUser) {
      return;
    }

    try {
      this.user = await this.userService.getUser(storageUser);
    } catch (e) {
      this.router.navigateByUrl('/');
    }
  }

  public register() {
    this.dialog.open(RegisterDialogComponent, { disableClose: true, width: '500px' })
      .afterClosed()
      .pipe(
        filter(e => e === 'ACCOUNT_CREATED')
      )
      .subscribe(() => {
        this.login();
      });
  }

  public login() {
    this.dialog.open(LoginDialogComponent, { disableClose: true, width: '500px' })
      .afterClosed()
      .pipe(
        filter(e => e),
        filter(e => e.type === 'SUCCESS')
      )
      .subscribe(({ user }) => {
        localStorage.setItem(USER_KEY, user.id);
        this.user = user;
        this.router.navigateByUrl('/store');
      });
  }

  public singOut() {
    localStorage.clear();
    this.user = undefined;
    this.router.navigateByUrl('/');
  }

}
