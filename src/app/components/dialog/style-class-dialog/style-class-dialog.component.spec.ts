import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleClassDialogComponent } from './style-class-dialog.component';

describe('StyleClassDialogComponent', () => {
  let component: StyleClassDialogComponent;
  let fixture: ComponentFixture<StyleClassDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StyleClassDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
