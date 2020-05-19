// Angular
import { Injectable } from '@angular/core';

// App
import { Mark } from '@app/models/mark';
import { HttpService } from '@app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class MarkService {
  private baseUrl = 'http://localhost:8080/api/marks';

  constructor(private httpService: HttpService) { }

  public addMark(mark: Mark): Promise<Mark> {
    try {
      return this.httpService.post(`${this.baseUrl}`, mark);
    } catch (e) {
      console.log('[addMark] ' + e);
    }
  }

}
