import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentMainPageComponent } from './document-main-page.component';

describe('DocumentMainPageComponent', () => {
  let component: DocumentMainPageComponent;
  let fixture: ComponentFixture<DocumentMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
