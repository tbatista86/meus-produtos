import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { Observable, map } from 'rxjs';

import { UserRequest } from '../models/userRequest';
import { UserResponse } from '../models/userResponse';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  public createUser(user: UserRequest): Observable<UserResponse> {
    const url = 'http://localhost:3000/users';

    const params: Params = user;

    return this.http.post<UserResponse>(url, params).pipe(
      map((response: UserResponse) => {
        return new UserResponse({
          user: new User({
            name: response.user.name,
            email: response.user.email,
          }),
        });
      })
    );
  }
}
