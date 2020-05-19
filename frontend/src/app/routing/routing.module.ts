import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGaurdService } from '@app/services/auth.guard.service';
import { Role } from '@app/models/user';

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
import { AdminAddClassViewComponent } from '../components/admin-add-class-view/admin-add-class-view.component';
import { AdminAddClassSuccessComponent } from '../components/admin-add-class-success/admin-add-class-success.component';
import { TeacherMarkAddViewComponent } from '../components/teacher-mark-add-view/teacher-mark-add-view.component';
import { TeacherPanelViewComponent } from '../components/teacher-panel-view/teacher-panel-view.component';
import { TeacherMarkAddedSuccessComponent } from '../components/teacher-mark-added-success/teacher-mark-added-success.component';

// Útvonalak
const routes: Routes = [
  { path: '', component: StartPageViewComponent, pathMatch: 'full' },
  { path: 'login', component: LoginViewComponent },
  { path: 'profile', component: ProfileViewComponent, data: { roles: ['ROLE_STUDENT', 'ROLE_TEACHER', 'ROLE_ADMIN'] }, canActivate: [AuthGaurdService] },

  // Diákok oldalai
  { path: 'student/subjects', component: StudentSubjectListViewComponent, data: { roles: ['ROLE_STUDENT'] }, canActivate: [AuthGaurdService] },
  { path: 'student/subjects/:id', component: StudentSubjectItemViewComponent, data: { roles: ['ROLE_STUDENT'] }, canActivate: [AuthGaurdService] },

  // Tanár oldalak
  { path: 'teacher-panel', component: TeacherPanelViewComponent, data: { roles: ['ROLE_TEACHER'] }, canActivate: [AuthGaurdService] },
  { path: 'teacher/add-marks', component: TeacherMarkAddViewComponent, data: { roles: ['ROLE_TEACHER'] }, canActivate: [AuthGaurdService]  },
  { path: 'teacher/add-marks/success', component: TeacherMarkAddedSuccessComponent, data: { roles: ['ROLE_TEACHER'] }, canActivate: [AuthGaurdService] },

  // Admin oldalak
  { path: 'admin-panel', component: AdminStartPageViewComponent, data: { roles: ['ROLE_ADMIN'] }, canActivate: [AuthGaurdService] },
  { path: 'admin/register-user', component: AdminRegisterUserViewComponent, data: { roles: ['ROLE_ADMIN'] }, canActivate: [AuthGaurdService] },
  { path: 'admin/add-class', component: AdminAddClassViewComponent, data: { roles: ['ROLE_ADMIN'] }, canActivate: [AuthGaurdService] },
  { path: 'admin/add-class/success', component: AdminAddClassSuccessComponent, data: { roles: ['ROLE_ADMIN'] }, canActivate: [AuthGaurdService] },
  { path: 'admin/register-user/success', component: AdminRegisterSuccessComponent, data: { roles: ['ROLE_ADMIN'] }, canActivate: [AuthGaurdService]  },

  // Kijelentkezést követő oldal
  { path: 'logged-out', component: LoggedOutViewComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: [],
})
export class RoutingModule { }
