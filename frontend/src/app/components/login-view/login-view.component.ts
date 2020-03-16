import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css'],
  providers: [AuthService]
})
export class LoginViewComponent implements OnInit {
  private error: boolean;
  private from: string;
  private buttonPressed: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // Ha egy olyan felhasználó nyitja meg a bejelentkező oldalt, aki már be van jelentkezve...
    if (this.authService.getUser() !== undefined) {
     
    }
    
    this.from = this.activatedRoute.snapshot.queryParamMap.get('from');
  }

  private login(username: string, password: string): void {
    this.buttonPressed = true;
    if (!username || !password) return;
    this.authService.login(username, password).subscribe((user) => {
      this.authService.setUser(user as User);
      if (this.from) {
        this.router.navigate(['/' + this.from]);
      } else {
        this.router.navigate(['/']);
      }
    }, (err) => {
      if (err.status === 403) {
        this.error = true;
      }
    });
  }

}