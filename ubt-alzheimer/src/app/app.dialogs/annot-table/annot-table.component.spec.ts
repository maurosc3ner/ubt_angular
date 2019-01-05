
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotTableComponent } from './annot-table.component';

describe('AnnotTableComponent', () => {
  let component: AnnotTableComponent;
  let fixture: ComponentFixture<AnnotTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnotTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
