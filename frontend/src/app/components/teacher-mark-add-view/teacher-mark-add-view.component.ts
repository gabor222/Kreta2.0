import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidatorFn, AbstractControl, FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Group } from '../../models/group';
import { User } from '../../models/user';
import { Subject } from '../../models/subject';
import { Mark } from '../../models/mark';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { GroupService } from '../../services/group.service';
import { SubjectService } from '../../services/subject.service';
import { MarkService } from '../../services/mark.service';

declare var M: any;

@Component({
  selector: 'app-teacher-mark-add-view',
  templateUrl: './teacher-mark-add-view.component.html',
  styleUrls: ['./teacher-mark-add-view.component.css'],
  providers: [UserService, GroupService, SubjectService, MarkService, DatePipe]
})
export class TeacherMarkAddViewComponent implements OnInit, AfterViewInit {
  groups: Group[];
  subjects: Subject[];
  students: User[];

  group: number;
  subject: Subject;
  description: string;
  date: Date;
  teacher: User;

  submitted: boolean;
  error: boolean;
  addMarkForm: FormGroup;
  studentsFormArray: FormArray;

  markOptions = [1,2,3,4,5];
  markOptionsText = ['Elégtelen', 'Elégséges', 'Közepes', 'Jó', 'Jeles'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private formBuilder: FormBuilder,
    private renderer: Renderer2,

    private authService: AuthService,
    private userService: UserService,
    private groupService: GroupService,
    private subjectService: SubjectService,
    private markService: MarkService,

    private datePipe: DatePipe
  ) {
    this.groups = [];
    this.subjects = [];
    this.buildForm();
  }

  async ngOnInit() {
    this.groups = await this.groupService.getGroups();
    this.groups = this.groups.filter(group => ['Adminisztrátorok', 'Tanárok'].indexOf(group.name) == -1);
    this.subjects = await this.subjectService.getSubjects();
    //setTimeout(this.initSelects, 1000);

  }

  ngAfterViewInit() {
    this.initDateTime();
  }

  private initDateTime() {
    let elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, { format: 'yyyy-mm-dd' });
  }

  reloadStudents() {
    let group = this.addMarkForm.value.group;
    console.log('Load students from group: ' + group)
    this.deleteAllStudentForm();
    if (group) {
      this.groupService.getUsers(group).then((students) => {
        this.students = students as User[];
        console.log(this.students);
        for (let student of this.students) {
          this.addStudentForm(student.realName, student.id);
        }
      });
    }

  }

  // Megjelenítendő üzenetek
  errorMessageResources = {
    description: {
      required: 'A leírás megadása kötelező.',
    },
    group: {
      required: 'A csoport megadása kötelező.',
    },
    subject: {
      required: 'A tantárgy megadása kötelező.',
    },
    date: {
      required: 'A dátum megadása kötelező.',
    },

  };

  // Létrehoz egy form-ot egy tanulóhoz
  // Ezzel önmagában még nem kerül be a fő form-ba, ahhoz az add függvény kell
  createStudentForm(studentName: string, studentId: number): FormGroup {
    return this.formBuilder.group({
      studentName: studentName,
      studentId: studentId,
      mark: undefined
    });
  }

  addStudentForm(studentName: string, studentId: number): void {
    this.studentsFormArray = this.addMarkForm.get('studentsFormArray') as FormArray;
    this.studentsFormArray.push(this.createStudentForm(studentName, studentId));
  }

  deleteStudentForm(index: number) {
    const studentsFormArray = <FormArray>this.addMarkForm.get('studentsFormArray') as FormArray;
    studentsFormArray.removeAt(index);
  }

  deleteAllStudentForm() {
    const studentsFormArray = <FormArray>this.addMarkForm.get('studentsFormArray');
    for (let i = studentsFormArray.length -1; i >= 0; i--) {
      this.deleteStudentForm(i);
    }
  }

  clear() {
    // const studentFormsControl = <FormArray>this.userForm.get('studentForms');

    //this.deleteAllStudentForm();
    //this.addMarkForm.reset();

      const invalid = [];
      const controls = this.addMarkForm.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
              invalid.push(name);
          }
      }
      console.log( invalid);
      console.log( this.addMarkForm.controls);
  }

  onSubmit() {
    if (!this.addMarkForm.valid) {
      return;
    }

    let basicFormData = Object.assign({}, this.addMarkForm.value);
    //console.log(basicFormData);
    //console.log(basicFormData.studentsFormArray[0].mark);

    let subject = this.subjects.find((subject) => subject.id == basicFormData.subject);
    /*console.log(basicFormData);
    console.log(this.subjects);
    console.log(subject);*/

    this.submitted = true;
    for (let student of basicFormData.studentsFormArray) {
      if (1 <= student.mark && student.mark <= 5) {
        let tmpMark = new Mark(
          -1,
          student.studentId,
          //this.teacher.id,
          this.authService.getUser().id,
          basicFormData.date,
          student.mark,
          basicFormData.description,
          subject
        );

        this.markService.addMark(tmpMark).then((mark) => {
          console.log('Jegy hozzáadva');
          console.log(mark);
        }, (err) => {
          console.log('Hiba a jegy hozzáadásakor');
          console.log(tmpMark);
          console.log(err);
        });
      }
    }

    this.router.navigate(['/teacher/add-marks/success']);

    /*setTimeout(() => {
      this.clear();
      this.router.navigate(['/teacher/add-marks/success']);
    }, 2000);*/

  }

  buildForm() {
    this.addMarkForm = this.formBuilder.group({
      description: [
        this.description,
        Validators.compose([
          Validators.required,
        ]),
      ],
      group: [this.group],
      subject: [this.subject],
      date: [this.date],
      studentsFormArray: this.formBuilder.array([ ]),
    });
  }

  // A datepicker beállítása magyarra
  // Beállítási lehetőségek: http://amsul.ca/pickadate.js/date/#options
  /*public birthdayDatepickerOptions: Pickadate.DateOptions = {
    monthsFull: [ 'január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december' ],
    monthsShort: [ 'jan', 'febr', 'márc', 'ápr', 'máj', 'jún', 'júl', 'aug', 'szept', 'okt', 'nov', 'dec' ],
    weekdaysFull: [ 'vasárnap', 'hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat' ],
    weekdaysShort: [ 'V', 'H', 'K', 'SZe', 'CS', 'P', 'SZo' ],
    today: 'Ma',
    clear: 'Törlés',
    firstDay: 1,
    format: 'yyyy. mmmm dd.',
    //formatSubmit: 'yyyy/mm/dd',
    formatSubmit: 'yyyy-mm-dd',
    close: 'Rendben',
    closeOnClear: true,
    closeOnSelect: false,
    editable: false,
    min: new Date('2018-09-01'), // valami hihető dátum egy jegynek
    max: new Date('2019-07-01'), // valami hihető dátum egy jegynek
    selectMonths: true,
    selectYears: 18,
  };*/
}
