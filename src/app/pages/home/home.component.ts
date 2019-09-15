import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../models/Product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: Array<Product> = [];

  constructor(private productsService: ProductsService) { }

  async ngOnInit() {
    try {
      this.products = await this.productsService.list();
    } catch (e) {
      console.error(e);
    }
  }

}
