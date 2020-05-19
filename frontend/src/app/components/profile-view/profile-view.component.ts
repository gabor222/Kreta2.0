import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { User } from '../../models/user'

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
  providers: [UserService, DatePipe]
})
export class ProfileViewComponent implements OnInit {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.setUser();
  }

  private setUser(): void {
    this.user = this.authService.getUser();
  }
}
