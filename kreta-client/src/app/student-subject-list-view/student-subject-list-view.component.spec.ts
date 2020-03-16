import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSubjectListViewComponent } from './student-subject-list-view.component';

describe('StudentSubjectListViewComponent', () => {
  let component: StudentSubjectListViewComponent;
  let fixture: ComponentFixture<StudentSubjectListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSubjectListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSubjectListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
