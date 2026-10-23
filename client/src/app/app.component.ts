import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { BasketService } from './basket/basket.service';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {





  constructor(private basketService: BasketService) {}


  ngOnInit(): void {
    const basketId = localStorage.getItem('basket_Id')
    if(basketId){
      this.basketService.getbasket(basketId)
      console.log(basketId)
    }




  }
}