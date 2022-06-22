import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPracticePageComponent } from './main-practice-page.component';

describe('MainPracticePageComponent', () => {
  let component: MainPracticePageComponent;
  let fixture: ComponentFixture<MainPracticePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPracticePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPracticePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
