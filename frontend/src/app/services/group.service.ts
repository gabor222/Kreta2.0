import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Group } from '../models/group';

@Injectable()
export class GroupService {
  private static api: string = 'http://localhost:8080/api/groups';
  private handleError;
  
  constructor(
    private http: HttpClient
  ) { }

  public getGroups(): Observable<Group[]> {
    return this.http.get(GroupService.api) as Observable<Group[]>;
  }

  public addGroup(group: Group): Observable<Group> {
    return this.http.post(GroupService.api + '/', group) as Observable<Group>;
  }

  // További funkciók
}