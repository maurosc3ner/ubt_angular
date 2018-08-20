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
  patient_current_data: JSON;
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
    console.log(this.Status);
      if (this.Command_Control == null) { } else {
        if (this.Command_Control[0] === 0 ) {
          this.notchFilter();
        }
        if (this.Command_Control[0] === 1 ) {
            this.patient_current_data = null;
            this.patientfile = null;
        }
        if (this.Command_Control[0] === 2 ) {
            this.patientfile = this.Command_Control[1];
            this.assignData();
        }
        if (this.Command_Control[0] === 3 ) {
          this.patient_current_data['debug']['time']['index'] = this.patient_current_data['debug']['time']['index'] - this.Command_Control[1] * 10 * this.patient_current_data['channels'][0]['samplefrequency'];
          this.Jump();
        }
        if (this.Command_Control[0] === 4 ) {
          this.patient_current_data['debug']['time']['index'] = this.patient_current_data['debug']['time']['index'] + this.Command_Control[1] * 10 * this.patient_current_data['channels'][0]['samplefrequency'];
          this.Jump();
        }
        if (this.Command_Control[0] === 5 ) {
          this.ocularFilter();
        }
        this.Command_Control = null;
    }

    if (this.Status === 0) {
      this.visAnno = false;
      this.visEEG = true;
      this.visESI = false;
      this.visPlane = false;
      this.visTopoPLot = false;
    }
    if (this.Status === 1) {
      this.visAnno = false;
      this.visEEG = true;
      this.visESI = true;
      this.visPlane = false;
      this.visTopoPLot = false;
    }
    if (this.Status === 2) {
      this.visAnno = false;
      this.visEEG = false;
      this.visESI = true;
      this.visPlane = true;
      this.visTopoPLot = false;
    }
    if (this.Status === 3) {
      this.visAnno = true;
      this.visEEG = true;
      this.visESI = false;
      this.visPlane = false;    
      this.visTopoPLot = false;
    }
    if (this.Status === 4) {
      this.visAnno = false;
      this.visEEG = true;
      this.visESI = false;
      this.visPlane = false;    
      this.visTopoPLot = true;
    }
  }
  assignData() {
    this.d3service.getPatientInfo(this.patientfile, this.patient_current_data).subscribe(
        (response: Response) => {
            this.patient_current_data = JSON.parse(JSON.stringify(response));
        },
    (err) => {
        console.log(err);
    });
  }

  Jump() {
    this.d3service.getJump(this.patient_current_data).subscribe(
        (response: Response) => {
            this.patient_current_data = JSON.parse(JSON.stringify(response));
        },
    (err) => {
        console.log(err);
    });
  }
  notchFilter() {
    this.d3service.getNotchFilter(this.patient_current_data).subscribe(
        (response: Response) => {
            this.patient_current_data = JSON.parse(JSON.stringify(response));
        },
    (err) => {
        console.log(err);
    });
  }
  ocularFilter() {
    this.d3service.getOcularFilter(this.patient_current_data).subscribe(
      (response: Response) => {
          this.patient_current_data = JSON.parse(JSON.stringify(response));
      },
  (err) => {
      console.log(err);
  });
  }
}
