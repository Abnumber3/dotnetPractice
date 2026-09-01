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
  brandIdSelected = 0;
  typeIdSelected = 0;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {

    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.brandIdSelected, this.typeIdSelected).subscribe({
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
        this.Brands = [{ id: 0, name: 'All' }, ...response];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (response) => {
        this.Types = [{ id: 0, name: 'All' }, ...response];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
    console.log
  }
}
