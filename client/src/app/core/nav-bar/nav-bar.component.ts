import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private basketService: BasketService){}

  basketQuantity$!: Observable<number>


  ngOnInit(): void {
   this.basketQuantity$ = this.basketService.basketSource$.pipe(
      map((basket)=>{
       return basket?.items.reduce((total, item)=>{
          return total + item.quantity;
        },0) ?? 0
      })
    )
  }

}
