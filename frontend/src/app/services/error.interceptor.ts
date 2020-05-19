// Angular
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// App
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        if (!this.router.url.startsWith('/login')) {
          this.authService.logout();
          location.reload(true);
        }
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
