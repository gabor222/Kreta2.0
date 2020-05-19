import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.getUser();
    if (currentUser) {
        if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
