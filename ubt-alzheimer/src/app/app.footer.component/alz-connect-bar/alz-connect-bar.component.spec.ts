import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlzConnectBarComponent } from './alz-connect-bar.component';

describe('AlzConnectBarComponent', () => {
  let component: AlzConnectBarComponent;
  let fixture: ComponentFixture<AlzConnectBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlzConnectBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlzConnectBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
