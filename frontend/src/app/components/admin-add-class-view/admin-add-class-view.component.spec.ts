import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddClassViewComponent } from './admin-add-class-view.component';

describe('AdminAddClassViewComponent', () => {
  let component: AdminAddClassViewComponent;
  let fixture: ComponentFixture<AdminAddClassViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddClassViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddClassViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
