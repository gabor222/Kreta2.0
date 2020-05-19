// Angular
import { Injectable } from '@angular/core';

// App
import { User } from '@app/models/user';
import { Subject } from '@app/models/subject';
import { HttpService } from '@app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private httpService: HttpService) { }

  public getCurrentUser(): Promise<User> {
    return this.httpService.get(`${this.baseUrl}/current`);
  }

  public findAll(): Promise<User[]> {
    return this.httpService.get(`${this.baseUrl}`);
  }

  public findById(userId: number): Promise<User> {
    return this.httpService.get(`${this.baseUrl}/${userId}`);
  }

  public getSubjects(userId: number): Promise<Subject[]> {
    return this.httpService.get(`${this.baseUrl}/${userId}/subjects`);
  }

  public create(user: User): Promise<User> {
    try {
      return this.httpService.post(`${this.baseUrl}`, user);
    } catch (e) {
      console.log('[create] ' + e);
    }
  }

  public delete(userId: number): Promise<User> {
    try {
      return this.httpService.delete(`${this.baseUrl}/${userId}`);
    } catch (e) {
      console.log('[delete] ' + e);
    }
  }

}
