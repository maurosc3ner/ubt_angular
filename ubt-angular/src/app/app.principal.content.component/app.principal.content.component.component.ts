import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-principal-content-component',
  templateUrl: './app.principal.content.component.component.html',
  styleUrls: ['./app.principal.content.component.component.css']
})
export class AppPrincipalContentComponent implements OnInit, OnChanges {
  @Input() Status: number;
  @Input() Command = -1;

  visAnno: boolean;
  visEEG: boolean;
  visESI: boolean;
  visTopoPLot: boolean;
  visPlane: boolean;
  Command_Control: number;

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
    if (this.Command !== -1) {this.Command_Control = this.Command; }
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
    if (this.Status === 3) {
      this.visEEG = false;
      this.visESI = true;
      this.visPlane = true;
    }
  }
}
