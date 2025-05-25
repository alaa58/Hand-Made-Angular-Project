import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ICategory } from '../../models/category.model';
import { ResponceGetAll } from '../../models/ResponceGetAll.model';
import { IProduct } from '../interfaces/iseller';
import { Responce } from '../../models/Responce.model';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<ResponceGetAll<ICategory>> {
    return this.http.get<ResponceGetAll<ICategory>>(`${environment.apiBaseUrl}/Category`);
  }

  addProduct(productData: FormData): Observable<Responce<IProduct>> {
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });

return this.http.post<Responce<IProduct>>(`${environment.apiBaseUrl}/Product`, productData, { headers });

  }
}
