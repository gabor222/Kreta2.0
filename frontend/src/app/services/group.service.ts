// Angular
import { Injectable } from '@angular/core';

// App
import { User } from '@app/models/user';
import { Group } from '@app/models/group';
import { HttpService } from '@app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private baseUrl = 'http://localhost:8080/api/groups';

  constructor(private httpService: HttpService) { }

  public getGroups(): Promise<Group[]> {
    return this.httpService.get(`${this.baseUrl}`);
  }

  public addGroup(group: Group): Promise<Group> {
    try {
      return this.httpService.post(`${this.baseUrl}`, group);
    } catch (e) {
      console.log('[addGroup] ' + e);
    }
  }

  public getUsers(groupId: number): Promise<User[]> {
    return this.httpService.get(`${this.baseUrl}/${groupId}/students`);
  }

}
