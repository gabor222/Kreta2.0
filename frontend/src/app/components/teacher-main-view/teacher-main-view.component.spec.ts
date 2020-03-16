import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMainViewComponent } from './teacher-main-view.component';

describe('TeacherMainViewComponent', () => {
  let component: TeacherMainViewComponent;
  let fixture: ComponentFixture<TeacherMainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherMainViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
