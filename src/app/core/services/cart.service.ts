import { ResponceGetAll } from '../../models/ResponceGetAll.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ICart } from '../interfaces/icart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = new BehaviorSubject<ICart[]>([]);
  cartItems$ = this.cartItems.asObservable();

  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();

  private cartTotalPrice = new BehaviorSubject<number>(0);
  cartTotalPrice$ = this.cartTotalPrice.asObservable();

  constructor(private _HttpClient: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getCart(): Observable<ResponceGetAll<ICart>> {
  return this._HttpClient.get<ResponceGetAll<ICart>>(
    `${environment.apiBaseUrl}/Cart`,
    { headers: this.getAuthHeaders() }
  ).pipe(
    tap(cart => {
      this.cartItems.next(cart.data); 
      this.updateCartSummary(cart); 
    }),
    catchError(error => {
      console.error('Error fetching cart:', error);
      const fallback: ResponceGetAll<ICart> = {
        isSuccess: false,
        data: [],
        errorcode: 500,
        message: 'Failed to fetch cart'
      };
      this.cartItems.next([]);
      this.updateCartSummary(fallback);
      return of(fallback);
    })
  );
}


  private updateCartSummary(cart: ResponceGetAll<ICart>) {
    const totalCount = cart.data.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.data.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    this.cartItemCount.next(totalCount);
    this.cartTotalPrice.next(totalPrice);
  }

  loadCartCount() {
    this.getCart().subscribe(); 
  }

  updateProductQuantity(cartItemId: number, newQuantity: number): Observable<any> {
    return this._HttpClient.put(
      `${environment.apiBaseUrl}/Cart/${cartItemId}`,
      { quantity: newQuantity },
      { headers: this.getAuthHeaders(), responseType: 'text' as const }
    ).pipe(
      //tap(() => this.getCart().subscribe())
                switchMap(() => this.getCart())

    );
  }


  addProductToCart(productId: number, quantity: number): Observable<any> {
  return this.getCart().pipe(
    map(cart => cart.data.find(item => item.productId === productId)),
    switchMap(existingProduct => {
      if (existingProduct) {
        const updatedQuantity = existingProduct.quantity + 1; 
        return this.updateProductQuantity(existingProduct.id, updatedQuantity);
      } else {
        return this._HttpClient.post(
          `${environment.apiBaseUrl}/Cart`,
          { productId, quantity: 1 }, 
          { headers: this.getAuthHeaders(), responseType: 'text' as const }
        ).pipe(
          switchMap(() => this.getCart())
        );
      }
    })
  );
}


  deleteCartItem(id: number): Observable<any> {
    return this._HttpClient.delete(
      `${environment.apiBaseUrl}/Cart/${id}`,
      { headers: this.getAuthHeaders() }
    ).pipe(
     // tap(() => this.getCart().subscribe())
     
          switchMap(() => this.getCart())
      
    );
  }
}
