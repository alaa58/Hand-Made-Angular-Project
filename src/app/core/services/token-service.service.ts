// src/app/core/services/token.service.ts
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private tokenKey = 'token';

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
    } catch (e) {
      console.error('Token decoding failed', e);
      return null;
    }
  }
}
