import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdfFileDialogComponent } from './edf-file-dialog.component';

describe('EdfFileDialogComponent', () => {
  let component: EdfFileDialogComponent;
  let fixture: ComponentFixture<EdfFileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdfFileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdfFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
