import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogin } from '../interfaces/ilogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 private apiUrl = `${environment.apiBaseUrl}/Account/login`;

  constructor(private http:HttpClient) {}

  login(userData : ILogin): Observable<any>
  {
    return this.http.post(this.apiUrl, userData);
  }
}
