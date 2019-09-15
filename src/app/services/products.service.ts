import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/Product.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public async list(): Promise<Array<Product>> {
    return this.http.get<Array<Product>>(`${environment.server}/products`).toPromise();
  }
}
