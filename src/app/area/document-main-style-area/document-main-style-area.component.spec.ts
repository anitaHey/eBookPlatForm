import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentMainStyleAreaComponent } from './document-main-style-area.component';

describe('DocumentMainStyleAreaComponent', () => {
  let component: DocumentMainStyleAreaComponent;
  let fixture: ComponentFixture<DocumentMainStyleAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentMainStyleAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentMainStyleAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
