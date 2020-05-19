import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { User } from './models/user';

declare var M: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  public constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    //this.authService.syncCurrentUser();
  }

  ngAfterViewInit() {
    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/logged-out']);
  }

  public isLinkActive(url) {
    let charPos = this.router.url.indexOf('?');
    let cleanUrl = charPos !== -1 ? this.router.url.slice(0, charPos) : this.router.url;
    return (cleanUrl === url);
}

  public title: string = 'e-Napló';
}
