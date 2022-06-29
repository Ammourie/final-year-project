import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPage2Component } from './about-page2.component';

describe('AboutPage2Component', () => {
  let component: AboutPage2Component;
  let fixture: ComponentFixture<AboutPage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutPage2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
