import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.syncLoginStatus();
  }

  private logout() {
    this.authService.logout();
    this.router.navigate(['/logged-out']);
  }

  private loggedIn(): boolean {
    return this.authService.getUser() !== undefined;
  }
  public title: string = 'e-Napló';
}