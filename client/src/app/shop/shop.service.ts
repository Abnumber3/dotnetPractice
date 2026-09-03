import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/products';
import { Itypes } from '../shared/models/types';
import { IBrands } from '../shared/models/brands';
import { ShopParams } from '../shared/models/shopParams';



@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:5001/api/'


  getProducts(shopParams: ShopParams){
    let params = new HttpParams();

    if(shopParams.brandId > 0)
      params = params.append('brandId', shopParams.brandId);

    if(shopParams.typeId)
      params = params.append('typeId', shopParams.typeId)

    if(shopParams.sort)
      params = params.append('sort', shopParams.sort)
    params = params.append('pageIndex', shopParams.pageNumber)
    params = params.append('pageSize', shopParams.pageSize)

    return this.http.get<IPagination<IProduct[]>>(this.baseUrl + 'products', {params})
  }


  getTypes(){
    return this.http.get<Itypes[]>(this.baseUrl + 'products/types')
  }


  getBrands(){
    return this.http.get<IBrands[]>(this.baseUrl + 'products/brands')
  }


}
