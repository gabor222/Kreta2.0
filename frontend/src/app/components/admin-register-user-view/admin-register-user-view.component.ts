import { Component, OnInit, Renderer } from '@angular/core';
import { ValidatorFn, AbstractControl, FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Pickadate } from 'pickadate/builds';

import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { User } from '../../models/user';
import { Group } from '../../models/group';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-admin-register-user-view',
  templateUrl: './admin-register-user-view.component.html',
  styleUrls: ['./admin-register-user-view.component.css'],
  providers: [UserService, GroupService]
})
export class AdminRegisterUserViewComponent implements OnInit {
  private users: User[];
  private groups: Group[];
  private submitted: boolean;
  private registrationError: boolean;

  registerUserForm: FormGroup;

  // A létrehozandó felhasználóhoz tartozó alapvető adatok
  user: User = {
    id: -1,
    password: '',
    userName: '',
    realName: '',
    role: '',
    birthDate: null,
    email: '',
    nationality: '',
    gender: '',
    avatar: '',
    classModel: null,
  };

  // Megjelenítendő üzenetek
  errorMessageResources = {
    realName: {
      required: 'A név megadása kötelező.',
      minlength: 'A név legalább 2 karakterből kell álljon.',
      maxlength: 'A név legfeljebb 255 karakterből állhat.',
    },
    birthDate: {
      required: 'A születési dátum megadása kötelező.',
    },
    nationality: {
      required: 'Az állampolgárság megadása kötelező.',
    },
    email: {
      required: 'Az e-mail megadása kötelező.',
      pattern: 'Formailag megfelelő e-mail címet adjon meg!',
    },
    userName: {
      pattern: 'A felhasználónév csak az angol ábécé kis- és nagybetűit, valamint számokat és alulvonást tartalmazhat!',
      required: 'A felhasználónév megadása kötelező.',
      minlength: 'A felhasználónév legalább 2 karakterből kell álljon.',
      maxlength: 'A felhasználónév legfeljebb 255 karakterből állhat.',
      alreadyExist: 'Ez a felhasználónév már használatban van.',
    },
    password: {
      required: 'A jelszó megadása kötelező.',
      minlength: 'A jelszó legalább 4 karakterből kell álljon.',
    },
    group: {
      required: 'A csoport megadása kötelező.',
    },
    role: {
      required: 'A szerepkör megadása kötelező.',
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private formBuilder: FormBuilder,
    private renderer: Renderer,

    private authService: AuthService,
    private userService: UserService,
    private groupService: GroupService,
  ) { }

  ngOnInit() {
    this.update();
    this.buildForm();
  }

  // Eltünteti az ékezeteket, szóközöket, stb
  /*private generateUserName(realName: string): string {
    return realName.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "").toLowerCase();
  }*/

  // Megnézi, hogy a validálni kívánt felhasználónév foglalt-e
  /*private existingUserNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (this.users === undefined) return null;
      return (this.users.filter((user) => user.userName === control.value).length > 0) ?  {'alreadyExist': true} : null;
    }
  }*/

  private checkUserNameExists(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const val = control.value;
      if (this.users === undefined) return null;
      return (this.users.filter((user) => user.userName === control.value).length > 0) ?  { alreadyExist: true } : null;
    }
  }

  private update(): void {
    // Csoportok
    this.groupService.getGroups().subscribe((groups) => {
      this.groups = groups as Group[];
    });
    // Felhasználók
    this.userService.getUsers().subscribe((users) => {
      this.users = users as User[];
    });
  }

  clear() {
    this.registerUserForm.reset();
  }

  onSubmit() {
    if (!this.registerUserForm.valid) {
      return;
    }

    this.submitted = true;

    // A felhasználó objektum feltöltése a form-ból kapott adatokkal
    this.user = Object.assign({}, this.registerUserForm.value);

    // Ki kell olvasni a kiválasztott osztály nevét, majd ahhoz hozzárendelni a felhasználót
    const selectedGroup = <FormArray>this.registerUserForm.get('group');
    console.log(selectedGroup);
    for (let group of this.groups) {
      if (group.name == selectedGroup.value) {
        this.user.classModel = group;
        break;
      }
    }

    // Mivel avatar választó még nincs, így egy random avatart kap
    let manAvatars = ['boy.png', 'man.png', 'man_beard.png', 'man_beard_glass.png'];
    let womanAvatars = ['girl.png', 'girl_2.png']
    if (this.user.gender === 'Férfi') {
      this.user.avatar = manAvatars[Math.floor(Math.random() * manAvatars.length)];
    } else {
      this.user.avatar = womanAvatars[Math.floor(Math.random() * womanAvatars.length)];
    }

    // A tényleges regisztráció kérése a backend-től
    this.userService.registerUser(this.user).subscribe((user) => {
        //console.log('Regisztrálva');
        this.clear();
        this.router.navigate(['/admin/register-user/success']);
      }, (err) => {
        this.registrationError = true;
      }
    );
  }

  buildForm() {
    this.registerUserForm = this.formBuilder.group({

      // Személyes adatok
      realName: [
        this.user.realName,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
        ]),
      ],

      birthDate: [this.user.birthDate, Validators.required],

      gender: [this.user.gender],

      nationality: [this.user.nationality, Validators.required],

      email: [
        this.user.email,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9!#$%&\'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$'),
        ]),
      ],

      // Felhasználói fiók adatai
      userName: [
        this.user.userName,
        Validators.compose([
          Validators.required,
          this.checkUserNameExists(),
          Validators.minLength(2),
          Validators.maxLength(255),
          Validators.pattern('^[a-zA-Z0-9_]+$'),
        ]),
      ],

      password: [this.user.password, Validators.compose([
          Validators.required,
          Validators.minLength(4),
        ]),
      ],

      group: [this.user.classModel],

      role: [this.user.role],
    });
  }

  // A datepicker beállítása magyarra
  // Beállítási lehetőségek: http://amsul.ca/pickadate.js/date/#options
  public birthdayDatepickerOptions: Pickadate.DateOptions = {
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
    max: new Date('2011-12-31'), // valami hihető dátum egy diáknak
    selectMonths: true,
    selectYears: 18,
  };

}
