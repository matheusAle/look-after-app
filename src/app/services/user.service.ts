import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from '../models/User.model';
import {HTTP_ERROR} from '../models/Error';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public async create(user: User): Promise<User> {
    const data: any = { ...user };

    data.id = this.genHash(data.email, data.password);
    data.createdAt = new Date().toISOString();

    return this.http
      .post<User>(`${environment.server}/users`, data)
      .toPromise()
      .catch((err: HttpErrorResponse) => {

        if (String(err.error).includes('Insert failed, duplicate id')) {
          throw HTTP_ERROR.DUPLICATED;
        }

        if (err.status === 404) {
          throw HTTP_ERROR.NOT_FOUNDED;
        }

        if (err.status === 500) {
          throw HTTP_ERROR.SERVER_ERROR;
        }

        console.error('UserService::create', err);
        throw err;
      });
  }

  private genHash(...data): string {
    return btoa(data.join('--'));
  }

  public async login(email: string, password: string): Promise<User> {
    return this.http.get<User>(`${environment.server}/users/${this.genHash(email, password)}`).toPromise();
  }

  public async getUser(id): Promise<User> {
    return this.http.get<User>(`${environment.server}/users/${id}`).toPromise();
  }
}
