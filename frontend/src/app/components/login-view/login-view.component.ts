import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css'],
})
export class LoginViewComponent implements OnInit {
  error = '';
  errorStatus = false;
  loading = false;
  returnUrl: string;
  buttonPressed: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // Ha egy olyan felhasználó nyitja meg a bejelentkező oldalt, aki már be van jelentkezve...
    if (this.authService.loggedIn()) {
      //this.router.navigate(['/']);
    }

    this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
  }

  login(username: string, password: string) {
    this.buttonPressed = true;
    if (!username || !password) return;
    this.loading = true;
    this.authService.authenticate(username, password).pipe(first())
    .subscribe(
      data => {
        console.log(`Login success`)
        console.log(this.authService.getUser())
        console.log(this.authService.getDefaultRoute())
        console.log(this.returnUrl)
        this.router.navigate(['/' + this.authService.getDefaultRoute()]);
      },
      error => {
        this.errorStatus = true;
        if (error instanceof HttpErrorResponse) {
          if (!navigator.onLine) {
            this.error = 'A böngészője nem csatlakozik az internethez.'
          } else {
            if (error.status === 401) {
              this.error = 'A megadott felhasználónév vagy jelszó helytelen.'
            }
            else if (error.message.indexOf('Http failure response for') == 0) {
              this.error = 'Nincs kapcsolat a kiszolgálóval, próbálja újra.'
            }
            else {
              this.error = `Hibakód: ${error.status} - Hibaüzenet: ${error.message}`;
            }
          }
        } else {
          if (error === 'Unauthorized') {
            this.error = 'A megadott e-mail cím vagy jelszó helytelen.'
          } else {
            this.error = `Angular hiba: ${error}`;
          }
        }
        this.loading = false;
      });
  }
}
