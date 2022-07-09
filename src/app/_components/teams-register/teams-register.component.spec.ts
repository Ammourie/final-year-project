import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsRegisterComponent } from './teams-register.component';

describe('TeamsRegisterComponent', () => {
  let component: TeamsRegisterComponent;
  let fixture: ComponentFixture<TeamsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
