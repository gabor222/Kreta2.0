import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './routing/routing.module';

import { AppComponent } from './app.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { StudentSubjectListViewComponent } from './student-subject-list-view/student-subject-list-view.component';
import { StudentSubjectItemViewComponent } from './student-subject-item-view/student-subject-item-view.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { StudentProfileViewComponent } from './student-profile-view/student-profile-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    StudentSubjectListViewComponent,
    StudentSubjectItemViewComponent,
    ProfileViewComponent,
    StudentProfileViewComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
