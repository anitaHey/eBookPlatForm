import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertWordComponent } from './insert-word.component';

describe('InsertWordComponent', () => {
  let component: InsertWordComponent;
  let fixture: ComponentFixture<InsertWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertWordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
