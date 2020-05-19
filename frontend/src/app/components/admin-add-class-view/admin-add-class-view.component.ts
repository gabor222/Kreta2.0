import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Group } from '@app/models/group';
import { GroupService } from '@app/services/group.service';

@Component({
  selector: 'app-admin-add-class-view',
  templateUrl: './admin-add-class-view.component.html',
  styleUrls: ['./admin-add-class-view.component.css'],
  providers: [GroupService]
})
export class AdminAddClassViewComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  classname: string;
  group: any = {
    name: '',
  };

  constructor(
    private groupService: GroupService,
    private router: Router,
  ) {
    this.form = new FormGroup({
      'classname': new FormControl(this.classname, [Validators.required]),
    });
  }

  ngOnInit() { }

  get fc() { return this.form.controls; }

  async onSubmit() {
    this.submitted = true;
    if (!this.form.valid) return;
    this.loading = true;

    this.group.name = this.fc.classname.value;

    this.groupService.addGroup(this.group).then(
      (group) => {
        this.router.navigate(['/admin/add-class/success']);
      },
      (err) => {
        this.loading = false;
      }
    );
  }

}
