import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeGroubsComponent } from './practice-groubs.component';

describe('PracticeGroubsComponent', () => {
  let component: PracticeGroubsComponent;
  let fixture: ComponentFixture<PracticeGroubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeGroubsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeGroubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
