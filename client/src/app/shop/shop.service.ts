import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/products';
import { Itypes } from '../shared/models/types';
import { IBrands } from '../shared/models/brands';



@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:5001/api/'


  getProducts(brandId?: number, typeId?: number, sort?: string){
    let params = new HttpParams();

    if(brandId)
      params = params.append('brandId', brandId);

    if(typeId)
      params = params.append('typeId', typeId)

    if(sort)
      params = params.append('sort', sort)

    return this.http.get<IPagination<IProduct[]>>(this.baseUrl + 'products', {params})
  }


  getTypes(){
    return this.http.get<Itypes[]>(this.baseUrl + 'products/types')
  }


  getBrands(){
    return this.http.get<IBrands[]>(this.baseUrl + 'products/brands')
  }
}
