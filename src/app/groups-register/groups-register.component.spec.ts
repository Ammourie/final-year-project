import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsRegisterComponent } from './groups-register.component';

describe('GroupsRegisterComponent', () => {
  let component: GroupsRegisterComponent;
  let fixture: ComponentFixture<GroupsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
