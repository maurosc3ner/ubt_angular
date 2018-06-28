import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-principal-content-component',
  templateUrl: './app.principal.content.component.component.html',
  styleUrls: ['./app.principal.content.component.component.css']
})
export class AppPrincipalContentComponent implements OnInit, OnChanges {
  @Input() Status: Number;

  visAnno: Boolean;
  visEEG: Boolean;
  visESI: Boolean;
  visTopoPLot: Boolean;
  visPlane: Boolean;

  srcImageSagital: String = './assets/brain-dummy/MRISagital.png';
  srcImageAxial: String = './assets/brain-dummy/MRIAxial.png';
  srcImageCoronal: String = './assets/brain-dummy/MRICoronal_2.jpg';

  ngOnInit() {
    this.Status = 0;
    this.visAnno = false;
    this.visEEG = true;
    this.visESI = false;
    this.visTopoPLot = false;
    this.visPlane = false;
  }

  ngOnChanges() {
    if (this.Status === 0) {
      this.visEEG = true;
      this.visESI = false;
      this.visPlane = false;
    }
    if (this.Status === 1) {
      this.visEEG = true;
      this.visESI = true;
      this.visPlane = false;
    }
    if (this.Status === 2) {
      this.visEEG = false;
      this.visESI = true;
      this.visPlane = true;
    }
  }
}
