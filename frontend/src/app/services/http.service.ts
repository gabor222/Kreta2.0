// Angular
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class HttpService {
  private baseUrl = 'http://localhost:8080/';

  private get options() {
    const headers = {
      "Content-Type": "application/json"
    };
    return {
      headers: new HttpHeaders(headers)
    };
  }

  constructor(
    private httpClient: HttpClient,
  ) {
    this.baseUrl = '';
  }

  public get = <T>(route): Promise<T> => {
    return this.httpClient.get(this.baseUrl + route, this.options).toPromise() as Promise<T>;
  };

  public post = <T>(route, body): Promise<T> => {
    return this.httpClient.post(this.baseUrl + route, body, this.options).toPromise() as Promise<T>;
  };

  public put = <T>(route, body): Promise<T> => {
    return this.httpClient.put(this.baseUrl + route, body, this.options).toPromise() as Promise<T>;
  };

  public patch = <T>(route, body): Promise<T> => {
    return this.httpClient.patch(this.baseUrl + route, body, this.options).toPromise() as Promise<T>;
  };

  public delete = <T>(route): Promise<T> => {
    return this.httpClient.delete(this.baseUrl + route, this.options).toPromise() as Promise<T>;
  };
}
