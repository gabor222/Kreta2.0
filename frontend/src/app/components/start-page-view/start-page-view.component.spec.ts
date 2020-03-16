import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPageViewComponent } from './start-page-view.component';

describe('StartPageViewComponent', () => {
  let component: StartPageViewComponent;
  let fixture: ComponentFixture<StartPageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartPageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
