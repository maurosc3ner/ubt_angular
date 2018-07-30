import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { D3Service } from '../app.services/d3/d3.service';

@Component({
  selector: 'app-principal-content-component',
  templateUrl: './app.principal.content.component.component.html',
  styleUrls: ['./app.principal.content.component.component.css']
})
export class AppPrincipalContentComponent implements OnInit, OnChanges {
  @Input() Status: number;
  @Input() Command_Control;

  visAnno: boolean;
  visEEG: boolean;
  visESI: boolean;
  visTopoPLot: boolean;
  visPlane: boolean;
  patientfile: string;
  patient_current_data: string;
  srcImageSagital: String = './assets/brain-dummy/MRISagital.png';
  srcImageAxial: String = './assets/brain-dummy/MRIAxial.png';
  srcImageCoronal: String = './assets/brain-dummy/MRICoronal_2.jpg';
  constructor(private d3service: D3Service) {

  }

  ngOnInit() {
    this.Command_Control = null;
    this.Status = 0;
    this.visAnno = false;
    this.visEEG = true;
    this.visESI = false;
    this.visTopoPLot = false;
    this.visPlane = false;
  }

  ngOnChanges() {
      console.log(this.Command_Control);
      if (this.Command_Control == null) { } else {
        if (this.Command_Control[0] === 1 ) {
            this.patient_current_data = null;
        }
        if (this.Command_Control[0] === 2 ) {
            this.assignData('sujeto_base');
        }
        this.Command_Control = null;
    }

    if (this.Status === 0) {
      this.visAnno = false;
      this.visEEG = true;
      this.visESI = false;
      this.visPlane = false;
    }
    if (this.Status === 1) {
      this.visAnno = false;
      this.visEEG = true;
      this.visESI = true;
      this.visPlane = false;
    }
    if (this.Status === 2) {
      this.visAnno = false;
      this.visEEG = false;
      this.visESI = true;
      this.visPlane = true;
    }
    if (this.Status === 3) {
      this.visAnno = true;
      this.visEEG = false;
      this.visESI = false;
      this.visPlane = false;    }
  }
  assignData(filename) {
    this.d3service.getPatientInfo(filename, this.patient_current_data).subscribe(
        (response: Response) => {
            this.patient_current_data = JSON.stringify(response);
        },
    (err) => {
        console.log(err);
    });
}
}
