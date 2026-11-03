import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/products';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketItem } from 'src/app/shared/models/basket';
import { find, map, Observable, take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product?: IProduct;

  currentProductQuantity$?:Observable<number>
  productQuantity: number = 1;

  basket$ = this.basketService.basketSource$;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private bcService: BreadcrumbService,
    private basketService: BasketService,
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.shopService.getProduct(+id).subscribe({
        next: (product) => {
          this.product = product;
          this.bcService.set('@productDetails', product.name);
          this.findProductQuanity(product.id)
          console.log(this.product?.pictureUrl);
          console.log(this.currentProductQuantity$)
        },

        error: (err) => {
          console.log(err);
          console.log(this.product?.pictureUrl);
        },
      });
    }
  }

  increaseItemQuantity() {
    this.productQuantity++
  }

  decreaseItemQuantity() {
    {
      if(this.productQuantity && this.productQuantity > 1){
        this.productQuantity--
      } else {
        return;
      }
    }
    console.log(this.productQuantity)
  }


  addToCart(product: IProduct){
    this.currentProductQuantity$?.pipe(
      take(1)
    ).subscribe({
      next: ((currentQuan)=>{
        if(currentQuan === 0){
          this.basketService.addItemToBasket(product)
        }else {
          this.basketService.addItemToBasket(product, this.productQuantity)
        }
      })
    })
    this.productQuantity = 1;
    console.log(this.productQuantity)
  }

   

  findProductQuanity(productId: number) {
  const currentItemQuantity = this.basketService.getProductQuantity(productId);

  this.currentProductQuantity$ = currentItemQuantity;
}

}
