// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// App
import { User, Role } from '@app/models/user';

import { HttpService } from '@app/services/http.service';
import { UserService } from '@app/services/user.service';

export class AuthResponse {
  constructor(
    public token: string,
    public user: User,
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private userService: UserService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  authenticate(emailAddress: string, password: string) {
    return this.http.post<any>(`http://localhost:8080/api/authenticate`, { emailAddress, password })
      .pipe(map((authResponse: AuthResponse) => {
        let user = authResponse.user;
        let token = authResponse.token;
        user.token = token;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  public getUser(): User {
    return this.currentUserSubject.value;
  }

  async syncCurrentUser() {
    this.currentUserSubject.next(await this.userService.getCurrentUser());
  }

  public loggedIn(): boolean {
    let user = this.getUser();
    return !(user === null);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public getCurrentUserEmail(): string {
    return this.getUser().email;
  }

  public getCurrentUserRole(): Role {
    let currentUser = this.getUser();
    if (currentUser === null) {
      return null;
    }
    return currentUser.role;
  }

  public isStudent(): boolean {
    return this.getCurrentUserRole() === Role.ROLE_STUDENT;
  }

  public isTeacher(): boolean {
    return this.getCurrentUserRole() === Role.ROLE_TEACHER;
  }

  public isAdmin(): boolean {
    return this.getCurrentUserRole() === Role.ROLE_ADMIN;
  }

  private getCurrentUserID = (): number => {
    return this.getUser().id;
  }

  public getDefaultRoute(): string {
    let currentUser = this.getUser();
    if (currentUser === null) {
      return '/';
    }
    let role = currentUser.role;
    switch (role) {
      case null:
      case undefined:
        return '/';
      case 'ROLE_STUDENT': {
        return '/student/subjects';
      }
      case 'ROLE_TEACHER': {
        return '/teacher-panel';
      }
      case 'ROLE_ADMIN': {
        return '/admin-panel';
      }
    }
  }
}
