import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisAnnotDialogComponent } from './vis-annot-dialog.component';

describe('VisAnnotDialogComponent', () => {
  let component: VisAnnotDialogComponent;
  let fixture: ComponentFixture<VisAnnotDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisAnnotDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisAnnotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
