import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/products';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  
 product?: IProduct ;


 constructor(
  private route: ActivatedRoute,
  private shopService: ShopService,
  private bcService: BreadcrumbService
  
  

 ) { }


  ngOnInit(): void {
   this.loadProduct()
  }

  loadProduct() {
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.shopService.getProduct(+id).subscribe({
        next: ((product)=>{
          this.product = product;
          this.bcService.set('@productDetails', product.name)
          console.log(this.product?.pictureUrl)
        }),

        error: ((err)=>{
          console.log(err)
          console.log(this.product?.pictureUrl)
        })
      })
    }


    


  }

}
