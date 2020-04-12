import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './routing/routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { StudentSubjectListViewComponent } from './components/student-subject-list-view/student-subject-list-view.component';
import { StudentSubjectItemViewComponent } from './components/student-subject-item-view/student-subject-item-view.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { StudentProfileViewComponent } from './components/student-profile-view/student-profile-view.component';
import { LoggedOutViewComponent } from './components/logged-out-view/logged-out-view.component';
import { TeacherMainViewComponent } from './components/teacher-main-view/teacher-main-view.component';
import { AdminRegisterUserViewComponent } from './components/admin-register-user-view/admin-register-user-view.component';
import { AdminStartPageViewComponent } from './components/admin-start-page-view/admin-start-page-view.component';
import { StartPageViewComponent } from './components/start-page-view/start-page-view.component';
//import { AdminRegisterSuccessComponent } from './components/admin-register-success/admin-register-success.component';

import { MaterializeModule } from 'ngx-materialize';
import { AdminAddClassViewComponent } from './components/admin-add-class-view/admin-add-class-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    StudentSubjectListViewComponent,
    StudentSubjectItemViewComponent,
    ProfileViewComponent,
    StudentProfileViewComponent,
    LoggedOutViewComponent,
    TeacherMainViewComponent,
    AdminRegisterUserViewComponent,
    AdminStartPageViewComponent,
    StartPageViewComponent,
    //AdminRegisterSuccessComponent,
    AdminAddClassViewComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    // Materialize
    MaterializeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
