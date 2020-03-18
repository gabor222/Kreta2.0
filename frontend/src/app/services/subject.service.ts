import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Subject } from '../models/subject';
import { Group } from '../models/group';
import { User } from '../models/user';

@Injectable()
export class SubjectService {
  private static api: string = 'http://localhost:8080/api/subjects';
  private handleError;
  
  constructor(
    private http: HttpClient
  ) { }

  public getSubjects(): Observable<Subject[]> {
    return this.http.get(SubjectService.api) as Observable<Subject[]>;
  }

  // További funkciók
}