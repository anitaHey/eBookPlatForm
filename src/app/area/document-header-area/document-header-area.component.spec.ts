import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentHeaderAreaComponent } from './document-header-area.component';

describe('DocumentHeaderAreaComponent', () => {
  let component: DocumentHeaderAreaComponent;
  let fixture: ComponentFixture<DocumentHeaderAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentHeaderAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentHeaderAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
