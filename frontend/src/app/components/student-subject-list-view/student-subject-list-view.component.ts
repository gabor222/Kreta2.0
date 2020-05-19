import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { User } from '../../models/user';
import { Subject } from '../../models/subject';
import { Mark } from '../../models/mark';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

declare var M: any;

@Component({
  selector: 'app-student-subject-list-view',
  templateUrl: './student-subject-list-view.component.html',
  styleUrls: ['./student-subject-list-view.component.css'],
  providers: [UserService, DatePipe]
})
export class StudentSubjectListViewComponent implements OnInit, AfterViewInit {
  private user: User;
  private users: User[];
  subjects: Subject[];
  marks: Mark[];
  average: Number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,

    private userService: UserService,

    private datePipe: DatePipe
  ) {
  }

  async ngOnInit() {
    this.setUser();
    await this.update();

    console.log('Userrrrr: ' + this.authService.getUser())
  }

  ngAfterViewInit() {

  }

  private setUser(): void {
    this.user = this.authService.getUser();
  }

  private initMaterializeCollapsible() {
    let elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);
  }

  async update() {
    this.users = await this.userService.findAll();
    this.subjects = await this.userService.getSubjects(this.user.id);
    this.calculateAverages();

    setTimeout(() => {
      this.initMaterializeCollapsible();
    }, 500)
  }

  // Kiszámolja, hogy az egyes tárgyakhoz tartozó jegyek átlaga mennyi (jelen esetben ez egy felhasználóra történik meg)
  calculateAverages(): void {
    if (this.subjects !== undefined) {
      for (let i = 0; i < this.subjects.length; i++) {
        let marks = this.subjects[i].marks;
        let sum = marks.reduce((a, b) => a + b.mark, 0);
        this.subjects[i].average = parseFloat((sum/marks.length).toFixed(2));
      }
    }
  }

  // A már tárgyanként kiszámolt átlagokat átlagolja
  getTotalAverage(): Number {
    if (this.subjects !== undefined) {
      let sum = this.subjects.reduce((a, b) => a + b.average, 0);
      return parseFloat((sum/this.subjects.length).toFixed(2));
    }
    return 0;
  }

  transformTimestamp(timestamp: number): string {
    return this.datePipe.transform(timestamp, 'y. MM. dd. HH:mm');
  }

  getUserName(userId: number): String {
    let filtered = this.users.filter((user) => user.id === userId);
    return filtered.length == 1 ? filtered[0].realName : "Ismeretlen felhasználó";
  }
}
