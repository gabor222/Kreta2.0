import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-start-page-view',
  templateUrl: './start-page-view.component.html',
  styleUrls: ['./start-page-view.component.css'],
  providers: [AuthService]
})
export class StartPageViewComponent implements OnInit {
  private error: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.navigateToRoleStartPage();
  }

  private navigateToRoleStartPage(): void {
    let user: User = this.authService.getUser();
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