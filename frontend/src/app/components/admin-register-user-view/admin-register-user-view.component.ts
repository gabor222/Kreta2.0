import { Component, OnInit, Renderer2, AfterContentInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { User } from '../../models/user';
import { Group } from '../../models/group';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { GroupService } from '../../services/group.service';

declare var M: any;

@Component({
  selector: 'app-admin-register-user-view',
  templateUrl: './admin-register-user-view.component.html',
  styleUrls: ['./admin-register-user-view.component.css'],
  providers: [UserService, GroupService]
})
export class AdminRegisterUserViewComponent implements OnInit, AfterContentInit {
  private users: User[];
  groups: Group[];

  form: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  // A létrehozandó felhasználóhoz tartozó alapvető adatok
  user: User = {
    id: -1,
    password: '',
    userName: '',
    realName: '',
    role: null,
    birthDate: null,
    email: '',
    nationality: '',
    male: true,
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
    private renderer: Renderer2,

    private authService: AuthService,
    private userService: UserService,
    private groupService: GroupService,
  ) {
    this.form = new FormGroup({
      'realname': new FormControl('', [Validators.required, Validators.minLength(2),
        Validators.maxLength(255)]),
      'birthdate': new FormControl('', [Validators.required]),
      'male': new FormControl(true, [Validators.required]),
      'nationality': new FormControl('magyar', [Validators.required]),

      'email': new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9!#$%&\'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$')]),
      'username': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255), Validators.pattern('^[a-zA-Z0-9_]+$')]),
      'password': new FormControl('', [Validators.required, Validators.minLength(4)]),

      'group': new FormControl('', [Validators.required]),
      'role': new FormControl('', [Validators.required]),
    });
  }

  async ngOnInit() {
    await this.getData();
  }

  private async getData() {
    this.groups = await this.groupService.getGroups();
    this.users = await this.userService.findAll();
    setTimeout(this.initSelects, 500);
  }

  private initDateTime() {
    let elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems);
  }

  private initSelects() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }

  ngAfterContentInit() {
    this.initDateTime();
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

  reset() { this.form.reset(); }

  get fc() { return this.form.controls; }

  private randomAvatar(male: boolean) {
    let manAvatars = ['boy.png', 'man.png', 'man_beard.png', 'man_beard_glass.png'];
    let womanAvatars = ['girl.png', 'girl_2.png'];
    return
      male
        ? manAvatars[Math.floor(Math.random() * manAvatars.length)]
        : womanAvatars[Math.floor(Math.random() * womanAvatars.length)];
  }

  async onSubmit() {
    this.submitted = true;
    if (!this.form.valid) return;
    this.loading = true;

    let user: any;

    user.realName = this.fc.realname.value;
    user.birthDate = new Date(this.fc.birthdate.value);

    console.log(user)

    // Ki kell olvasni a kiválasztott osztály nevét, majd ahhoz hozzárendelni a felhasználót
    /*const selectedGroup = <FormArray>this.registerUserForm.get('group');
    console.log(selectedGroup);
    for (let group of this.groups) {
      if (group.name == selectedGroup.value) {
        this.user.classModel = group;
        break;
      }
    }*/

    // A tényleges regisztráció kérése a backend-től
    /*this.userService.create(this.user).then((user) => {
        //console.log('Regisztrálva');
        this.clear();
        this.router.navigate(['/admin/register-user/success']);
      }, (err) => {
        this.registrationError = true;
      }
    );*/
  }

}
