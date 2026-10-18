import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, BasketTotals, IBasketItem } from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../shared/models/products';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;

  // creates a new instance of the basket class and sets the basketSource to the value of the basket. BehaviorSubject is a type of observable that allows you to set an initial value and then emit new values to subscribers. In this case, the initial value is null, and the basketSource$ observable will emit new values whenever the basketSource is updated. This allows other components in the application to subscribe to the basketSource$ observable and receive updates whenever the basket is updated.
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();

  // private basketTotalSource 
  constructor(private http: HttpClient) {}

  // gets basket from the api and sets the basketSource to the value of the basket

  getbasket(id: string) {
    return this.http.get<Basket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: (basket) => {
        this.basketSource.next(basket);
      },
    });
  }

  // updates the basket in the api and sets the basketSource to the value of the basket
  updateBasket(basket: Basket) {
    return this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: (basket) => {
        this.basketSource.next(basket);
      },
    });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addQuantity(basketItem: IBasketItem) {
   const currentBasket = this.getCurrentBasketValue();
   if(!currentBasket){
    return;
   }
   const itemToAdd = basketItem;
   const currentBasketItems = currentBasket.items;
   const quantity = 1;
   this.addOrUpdateItem(currentBasketItems, itemToAdd, quantity)
   return this.updateBasket(currentBasket);
  }


  decreaseQuantity(basketItem: IBasketItem){
    const currentBasket = this.getCurrentBasketValue();

    if(!currentBasket){
      return;
    }

    const items = currentBasket.items.find((x)=>{
      x.id === basketItem.id;
    })

    if(items?.quantity && items.quantity > 0){
      items.quantity--
    } else {
      currentBasket.items.filter((x)=>{
        return x.id !== basketItem.id
      })
    }

    return this.updateBasket(currentBasket);

} 

  calculateBasketTotals() {
  
  }




  // maps the product item to the basket item and returns the basket item
  private itemToBasketItemMapper(item: IProduct): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      pictureUrl: item.pictureUrl,
      price: item.price,
      quantity: 0,
      productBrand: item.productBrand,
      productType: item.productType,
    };
  }

  //local storage is basically a referance for the browser to retrieve your basket form redis

  createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_Id', basket.id);
    return basket;
  }

  //The addOrUpdateItem() method searches the basket's items array for an item with the same ID as itemToAdd. If a match is found: Increase the existing item's quantity by the amount specified. If no match is found: Set the new item's quantity to the specified amount and push it into the array. Finally: Return the updated items array.

  addOrUpdateItem(
    items: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number,
  ): IBasketItem[] {
    const item = items.find((x) => {
      return x.id === itemToAdd.id;
    });
    if (item) {
      item.quantity += quantity;
    } else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }



  // 1. maps raw product item to basket item (see interface)
  // 2. checks to see if a basket exists if not it creates basket
  // 3. adds or updates current basket with new items client selects

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd = this.itemToBasketItemMapper(item);
    //does a basket currently exist if not we create one
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.updateBasket(basket);
  }
}
