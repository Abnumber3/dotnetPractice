import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { IBasketItem } from '../shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  constructor(public basketService: BasketService){}



  

  addToBasket(basketItem: IBasketItem){
    this.basketService.addQuantity(basketItem);
  }

  decreaseFromBasket(basketItem: IBasketItem){
    this.basketService.decreaseQuantity(basketItem);
  }

  
}
