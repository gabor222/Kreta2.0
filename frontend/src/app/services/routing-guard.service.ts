import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate, CanActivateChild } from '@angular/router';

import { AuthService } from './auth.service'; 
import { User } from '../models/user'; 

@Injectable()
export class RoutingGuardService implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!route.data.roles) {
      return true;
    }

    let user: User = this.authService.getUser();

    if (user) {
      if (route.data.roles.includes(user.role)) {
        return true;
      } else { // ha be van jelentkezve a felhasználó, a saját kezdőoldalára kell irányítani
        this.navigateToRoleStartPage(user);
        return true;
      }
    }

    // Ha a felhasználó egy olyan oldalt nyit meg, amelyhez nincs jogosultsága, akkor a bejelentkező oldalra kell irányítani, 
    // megőrizve azt az útvonalat, amit eredetileg meg akart nyitni.
    this.router.navigate(['/login'], { queryParams: { from: route.routeConfig.path } });
    return false;
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  private navigateToRoleStartPage(user: User): void {
    if (user !== undefined) {
      let role = user.role;
      switch (role) { // alapértelmezett kezdőoldalak a különböző szerepköröknek
        case 'ROLE_STUDENT': {
          this.router.navigate(['/student/subjects']);
          break;
        }
        case 'ROLE_TEACHER': {
          this.router.navigate(['/student/subjects']);
          break;
        }
        case 'ROLE_ADMIN': {
          this.router.navigate(['/admin-panel']);
          break;
        }
      }
    } else { // ha nincs bejelentkezve
      this.router.navigate(['/login']);
    }
  }
}