import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/products';



@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:5001/api/'


  getProducts(){
    return this.http.get<IPagination<IProduct[]>>(this.baseUrl + 'products')
  }
}
