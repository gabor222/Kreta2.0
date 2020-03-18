import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginViewComponent } from '../components/login-view/login-view.component';
import { StudentSubjectListViewComponent } from '../components/student-subject-list-view/student-subject-list-view.component';
import { StudentSubjectItemViewComponent } from '../components/student-subject-item-view/student-subject-item-view.component';
import { ProfileViewComponent } from '../components/profile-view/profile-view.component';
import { StudentProfileViewComponent } from '../components/student-profile-view/student-profile-view.component';
import { LoggedOutViewComponent } from '../components/logged-out-view/logged-out-view.component';
import { TeacherMainViewComponent } from '../components/teacher-main-view/teacher-main-view.component';
import { AdminStartPageViewComponent } from '../components/admin-start-page-view/admin-start-page-view.component';
import { StartPageViewComponent } from '../components/start-page-view/start-page-view.component';
import { AdminRegisterUserViewComponent } from '../components/admin-register-user-view/admin-register-user-view.component';
import { AdminRegisterSuccessComponent } from '../components/admin-register-success/admin-register-success.component';

// Authorizáció
import { RoutingGuardService } from '../services/routing-guard.service';
import { AuthService } from '../services/auth.service';
import { AdminAddClassViewComponent } from '../components/admin-add-class-view/admin-add-class-view.component';

// Útvonalak
const routes: Routes = [
  { 
    path: '', 
    canActivateChild: [RoutingGuardService],
    children: [
      { path: '', component: StartPageViewComponent },
      { path: 'login', component: LoginViewComponent },
      { path: 'profile', component: ProfileViewComponent, data: { roles: ['ROLE_STUDENT', 'ROLE_TEACHER', 'ROLE_ADMIN'] } },

      // Diákok oldalai
      { path: 'student/subjects', component: StudentSubjectListViewComponent, data: { roles: ['ROLE_STUDENT'] } },
      { path: 'student/subjects/:id', component: StudentSubjectItemViewComponent, data: { roles: ['ROLE_STUDENT'] } },

      // Admin oldalak
      { path: 'admin-panel', component: AdminStartPageViewComponent, data: { roles: ['ROLE_ADMIN'] } },
      { path: 'admin/register-user', component: AdminRegisterUserViewComponent, data: { roles: ['ROLE_ADMIN'] } },
      { path: 'admin/add-class', component: AdminAddClassViewComponent, data: { roles: ['ROLE_ADMIN'] } },
      { path: 'admin/register-user/success', component: AdminRegisterSuccessComponent },
      
      // Kijelentkezést követő oldal
      { path: 'logged-out', component: LoggedOutViewComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)  ],
  exports: [ RouterModule ],
  declarations: [],
  providers: [RoutingGuardService, AuthService]
})
export class RoutingModule { }