import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-admin-add-class-view',
  templateUrl: './admin-add-class-view.component.html',
  styleUrls: ['./admin-add-class-view.component.css'],
  providers: [GroupService]
})
export class AdminAddClassViewComponent implements OnInit {
  addClassForm: FormGroup;
  group: Group = {
    id: -1,
    name: '',
  };

  errorMessageResources = {
    name: {
      required: 'A név megadása kötelező.',
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService) {  }

  ngOnInit() {
    this.buildForm()
  }

  onSubmit() {
    if (!this.addClassForm.valid) {
      return;
    }

    this.group = Object.assign({}, this.addClassForm.value);

    this.groupService.addGroup(this.group).subscribe((group) => {
      console.log('Regisztrálva');
    }, (err) => {

    }
  );
  }

  buildForm() {
    this.addClassForm = this.formBuilder.group({
      name: [
        this.group.name, 
        Validators.compose([
          Validators.required,
        ]),
      ],
    })
  }

}
