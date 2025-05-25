import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.model';
import { environment } from '../../environments/environment';
import { ResponceGetAll } from '../models/ResponceGetAll.model';
import { Responce } from '../models/Responce.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getCategories() {
    throw new Error('Method not implemented.');
  }
  addProduct(formData: FormData) {
    throw new Error('Method not implemented.');
  }
productList:ResponceGetAll<IProduct>={
   isSuccess: false,
    data: [],
    errorcode: 0,
    message: ''
};
saledProductList:ResponceGetAll<IProduct>={
   isSuccess: false,
    data: [],
    errorcode: 0,
    message: ''
};

  constructor( private http:HttpClient) { }
baseUrl="https://handmademarket.runasp.net/api/Product";

getAllProducts(pageNumber: number, pageSize: number): Observable<{ data: ResponceGetAll<IProduct>, totalPages: number }> {
  var res=this.http.get<{ data: ResponceGetAll<IProduct>, totalPages: number }>(this.baseUrl, {
    params: {
      pageSize,
      pageNumber
    }
  });
  return res;

}

getById(productId:string):Observable<Responce<IProduct>>{
  var res= this.http.get<Responce<IProduct>>(`${this.baseUrl}/${productId}`);
  return res;
}

getSaledProducts():Observable<ResponceGetAll<IProduct>>{
 return this.http.get<ResponceGetAll<IProduct>>(`${this.baseUrl}/Sale`);
}



getProductById(id: number): Observable<Responce<IProduct>> {
  return this.http.get<Responce<IProduct>>(`${environment.apiBaseUrl}/Product/${id}`);
}

deleteProductById(id:number):Observable<Responce<IProduct>>{
  return this.http.delete<Responce<IProduct>>(`${environment.apiBaseUrl}/Product/${id}`)
}
}
