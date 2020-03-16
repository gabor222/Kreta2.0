import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisterUserViewComponent } from './admin-register-user-view.component';

describe('AdminRegisterUserViewComponent', () => {
  let component: AdminRegisterUserViewComponent;
  let fixture: ComponentFixture<AdminRegisterUserViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRegisterUserViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegisterUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
