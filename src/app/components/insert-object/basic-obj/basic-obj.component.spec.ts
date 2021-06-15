import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicObjComponent } from './basic-obj.component';

describe('BasicObjComponent', () => {
  let component: BasicObjComponent;
  let fixture: ComponentFixture<BasicObjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicObjComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicObjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
