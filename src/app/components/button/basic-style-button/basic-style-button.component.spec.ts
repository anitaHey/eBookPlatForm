import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicStyleButtonComponent } from './basic-style-button.component';

describe('BasicStyleButtonComponent', () => {
  let component: BasicStyleButtonComponent;
  let fixture: ComponentFixture<BasicStyleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicStyleButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicStyleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
