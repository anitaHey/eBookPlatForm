import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFamilyComponent } from './text-family.component';

describe('TextFamilyComponent', () => {
  let component: TextFamilyComponent;
  let fixture: ComponentFixture<TextFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextFamilyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
