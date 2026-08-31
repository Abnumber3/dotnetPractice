import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/models/products';
import { IBrands } from '../shared/models/brands';
import { Itypes } from '../shared/models/types';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  Products: IProduct[] = [];
  Brands: IBrands[] = [];
  Types: Itypes[] = [];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {

    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts().subscribe({
      next: (response) => {
        this.Products = response.data;
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (response) => {
        this.Brands = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (response) => {
        this.Types = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
