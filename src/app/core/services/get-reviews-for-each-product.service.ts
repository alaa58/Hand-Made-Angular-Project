// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { environment } from '../../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class GetReviewsForEachProductService {

//   constructor() { }
//   private readonly _HttpClient = inject(HttpClient)

//   GetReviewsForEachProduct(productId:number):Observable<any>
//   {
//      return this._HttpClient.get(`${environment.apiBaseUrl}/Rating/${productId}/ratings`)
//   }
// }


import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IRating } from '../../core/interfaces/irating'; // Import the interface
import { ResponceGetAll } from '../../models/ResponceGetAll.model';

@Injectable({
  providedIn: 'root'
})
export class GetReviewsForEachProductService {
  private readonly _HttpClient = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  GetReviewsForEachProduct(productId: number): Observable<ResponceGetAll<IRating>> {
    return this._HttpClient.get<ResponceGetAll<IRating>>(`${this.baseUrl}/Rating/${productId}/ratings`);
  }


  addReview(productId: number, rating: IRating): Observable<any> {
    ///Rating/8/rate
    return this._HttpClient.post(`${this.baseUrl}/Rating/${productId}/rate`, rating);
  }



}
