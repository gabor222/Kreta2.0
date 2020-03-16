import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginViewComponent } from '../login-view/login-view.component';
import { StudentSubjectListViewComponent } from '../student-subject-list-view/student-subject-list-view.component';
import { StudentSubjectItemViewComponent } from '../student-subject-item-view/student-subject-item-view.component';
import { StudentProfileViewComponent } from '../student-profile-view/student-profile-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginViewComponent
  },
  {
    path: 'student/subjects',
    component: StudentSubjectListViewComponent
  },
  {
    path: 'student/profile',
    component: StudentProfileViewComponent
  },
  {
    path: 'student',
    redirectTo: '/student/subjects',
    pathMatch: 'full'
  },
  {
    path: 'student/subjects/:id',
    component: StudentSubjectItemViewComponent
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)  ],
  exports: [ RouterModule ],
  declarations: []
})
export class RoutingModule { }