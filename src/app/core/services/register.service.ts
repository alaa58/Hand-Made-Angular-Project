import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IRegister } from '../interfaces/iregister';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = `${environment.apiBaseUrl}/Account/register`;

  constructor(private http:HttpClient) {}

  register(userData : IRegister): Observable<any>
  {
    return this.http.post(this.apiUrl, userData,{responseType:'text'});
  }
}
