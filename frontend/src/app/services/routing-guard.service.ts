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
        this.router.navigate(['']);
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
}