import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleClassButtonComponent } from './style-class-button.component';

describe('StyleClassButtonComponent', () => {
  let component: StyleClassButtonComponent;
  let fixture: ComponentFixture<StyleClassButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StyleClassButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleClassButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
