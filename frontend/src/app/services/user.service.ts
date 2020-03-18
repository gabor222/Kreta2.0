import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { Subject } from '../models/subject';
import { Mark } from '../models/mark';

@Injectable()
export class UserService {
  private static api: string = 'http://localhost:8080/api/users';
  private handleError;
  
  constructor(
    private http: HttpClient
  ) { }

  public getUsers(): Observable<User[]> {
    return this.http.get(UserService.api) as Observable<User[]>;
  }

  public getUser(id: number): Observable<User> {
    return this.http.get(UserService.api + '/' + id) as Observable<User>;
  }

  public getUserByUserName(username: string): Observable<User> {
    return this.http.get(UserService.api + '/' + username) as Observable<User>;
  }

  public delUserById(id: number): Observable<any> {
    return this.http.delete(UserService.api + '/' + id);
  }

  public registerUser(user: User): Observable<User> {
    return this.http.post(UserService.api + '/', user) as Observable<User>;
  }

  public getSubjectsByUser(id: number): Observable<Subject[]> {
    return this.http.get(UserService.api + '/' + id + '/subjects') as Observable<Subject[]>;
  }
}