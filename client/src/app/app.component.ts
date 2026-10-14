import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { BasketService } from './basket/basket.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Skinet';



  constructor(private basketService: BasketService) {}


  ngOnInit(): void {
    const basketId = localStorage.getItem('basketId')
    if(basketId){
      this.basketService.getbasket(basketId)

      console.log(basketId)
    }

  }
}