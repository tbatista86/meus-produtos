import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/loginReques';
import { Observable, map, tap } from 'rxjs';
import { LoginResposnse } from '../models/loginResponse';
import { Params } from '@angular/router';
import { User } from '../models/user';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return !!token;
  }

  public login(loginReques: LoginRequest): Observable<LoginResposnse> {
    const url = 'http://localhost:3000/login';
    const params: Params = loginReques;

    return this.httpClient.post<LoginResposnse>(url, params).pipe(
      tap((response) => {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem(
          'expirationDate',
          new Date(Date.now() + 60 * 60 * 1000).toDateString()
        );
      }),
      map((response: LoginResposnse) => {
        return new LoginResposnse({
          accessToken: response.accessToken,
          user: new User({
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
          }),
        });
      })
    );
  }

  public decodeToken(token: string): any {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }
}
