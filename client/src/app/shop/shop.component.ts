import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/models/products';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  Products: IProduct[] = [];


  constructor(private shopService: ShopService){}



  ngOnInit(): void {

    this.shopService.getProducts().subscribe({
      next: ((response)=>{
       this.Products =  response.data;
      }),

      error: ((err)=>{
        console.log(err)
      })
    })
   
  }



  

}
