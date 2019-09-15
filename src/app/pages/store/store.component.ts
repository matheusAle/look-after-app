import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  public user: User;

  constructor(private userService: UserService, public router: Router) { }

  async ngOnInit() {
    const storageUser = localStorage.getItem(environment.userStorageKey);
    if (!storageUser) {
      return;
    }

    try {
      this.user = await this.userService.getUser(storageUser);
    } catch (e) {
      this.router.navigateByUrl('/');
    }

  }
}
