import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Subject } from '../models/subject';
import { Group } from '../models/group';
import { User } from '../models/user';
import { Mark } from '../models/mark';

@Injectable()
export class MarkService {
  private static api: string = 'http://localhost:8080/api/marks';
  private handleError;
  
  constructor(
    private http: HttpClient
  ) { }

  public addMark(mark: Mark): Observable<Mark> {
    return this.http.post(MarkService.api + '/', mark) as Observable<Mark>;
  }


  // További funkciók
}