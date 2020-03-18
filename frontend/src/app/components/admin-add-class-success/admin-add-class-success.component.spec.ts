import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddClassSuccessComponent } from './admin-add-class-success.component';

describe('AdminAddClassSuccessComponent', () => {
  let component: AdminAddClassSuccessComponent;
  let fixture: ComponentFixture<AdminAddClassSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddClassSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddClassSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
