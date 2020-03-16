import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSubjectItemViewComponent } from './student-subject-item-view.component';

describe('StudentSubjectItemViewComponent', () => {
  let component: StudentSubjectItemViewComponent;
  let fixture: ComponentFixture<StudentSubjectItemViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSubjectItemViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSubjectItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
