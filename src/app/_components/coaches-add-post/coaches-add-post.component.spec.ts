import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachesAddPostComponent } from './coaches-add-post.component';

describe('CoachesAddPostComponent', () => {
  let component: CoachesAddPostComponent;
  let fixture: ComponentFixture<CoachesAddPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachesAddPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachesAddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
