// Angular
import { Injectable } from '@angular/core';

// App
import { Subject } from '@app/models/subject';
import { HttpService } from '@app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private baseUrl = 'http://localhost:8080/api/subjects';

  constructor(private httpService: HttpService) { }

  public getSubjects(): Promise<Subject[]> {
    return this.httpService.get(`${this.baseUrl}`);
  }

}
