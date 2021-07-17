import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontFamilyButtonComponent } from './font-family-button.component';

describe('FontFamilyButtonComponent', () => {
  let component: FontFamilyButtonComponent;
  let fixture: ComponentFixture<FontFamilyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FontFamilyButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FontFamilyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
