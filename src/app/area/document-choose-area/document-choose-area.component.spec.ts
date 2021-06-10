import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentChooseAreaComponent } from './document-choose-area.component';

describe('DocumentChooseAreaComponent', () => {
  let component: DocumentChooseAreaComponent;
  let fixture: ComponentFixture<DocumentChooseAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentChooseAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentChooseAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
