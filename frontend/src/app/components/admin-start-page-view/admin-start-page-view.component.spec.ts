import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStartPageViewComponent } from './admin-start-page-view.component';

describe('AdminStartPageViewComponent', () => {
  let component: AdminStartPageViewComponent;
  let fixture: ComponentFixture<AdminStartPageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStartPageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStartPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
