import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentInsertAreaComponent } from './document-insert-area.component';

describe('DocumentInsertAreaComponent', () => {
  let component: DocumentInsertAreaComponent;
  let fixture: ComponentFixture<DocumentInsertAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentInsertAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentInsertAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
