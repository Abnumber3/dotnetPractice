import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { IBasketTotals, IBasketItem } from '../shared/models/basket';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
    basketTotal$: Observable<IBasketTotals|null>;
    baseUrl = environment.apiUrl
    

  constructor(
    public basketService: BasketService,
    public httpClent: HttpClient
  ){
    this.basketTotal$ = this.basketService.basketTotalSource$
  }



  addToBasket(basketItem: IBasketItem){
    this.basketService.addQuantity(basketItem);
  }

  decreaseFromBasket(basketItem: IBasketItem){
    this.basketService.decreaseQuantity(basketItem);
  }

  deleteBasket(basketId: string){
    this.basketService.deleteBasket(basketId).subscribe({
      next: (()=>{
        console.log('you deleted the basket')
      }),
      error: ((err)=>{
        console.log('problem deleting basket ', err)
      })
    })
  }

  
}
