import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentMainAreaComponent } from './document-main-area.component';

describe('DocumentMainAreaComponent', () => {
  let component: DocumentMainAreaComponent;
  let fixture: ComponentFixture<DocumentMainAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentMainAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentMainAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
