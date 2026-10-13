import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { BreadcrumbService } from 'xng-breadcrumb';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartNumber: number = 0;


  constructor(
    public breadcrumbService: BreadcrumbService,
    public basketService: BasketService
  ) { }

    ngOnInit(): void {
  const basket  = this.basketService.getCurrentBasketValue()
  if(basket){
     this.cartNumber = basket.items.length + 1;
  }

}
 
}
