import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentStyleAreaComponent } from './document-style-area.component';

describe('DocumentStyleAreaComponent', () => {
  let component: DocumentStyleAreaComponent;
  let fixture: ComponentFixture<DocumentStyleAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentStyleAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentStyleAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
