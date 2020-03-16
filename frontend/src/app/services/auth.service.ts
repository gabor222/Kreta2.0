import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable()
export class AuthService {
  private static api: string = 'http://localhost:8080/api/auth';
  public static user: User;

  constructor(
    private http: HttpClient
  ) { }

  public logout(): void {    
    this.http.get(AuthService.api + '/logout').subscribe(() => {
      this.setUser(undefined);
    });
  }

  public login(username: string, password: string): Observable<User> {
    let tempUser: User = new User(-1, username, '', 'ROLE_GUEST');
    tempUser.password = password;
    return this.http.post(AuthService.api + '/login', tempUser) as Observable<User>;
  }

  public setUser(user: User) {
    AuthService.user = user;
  }

  public getUser(): User {
    return AuthService.user;
  }

  public syncLoginStatus(): void {
    this.http.get(AuthService.api + '/user').subscribe((user: User) => {
      if (user) {
        this.setUser(user);
      }
    });
  }

  public hasRole(role) {
    if (!this.getUser()) {
      return false;
    }
    return this.getUser().role == role;
  }
}