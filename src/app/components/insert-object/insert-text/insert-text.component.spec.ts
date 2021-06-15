import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertTextComponent } from './insert-text.component';

describe('InsertTextComponent', () => {
  let component: InsertTextComponent;
  let fixture: ComponentFixture<InsertTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
