import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotDialogComponent } from './annot-dialog.component';

describe('AnnotDialogComponent', () => {
  let component: AnnotDialogComponent;
  let fixture: ComponentFixture<AnnotDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
