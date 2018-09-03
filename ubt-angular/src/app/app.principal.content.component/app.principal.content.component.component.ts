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
  srcTopoPlot: any;
  brainColors:JSON;

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
    // console.log(this.Command_Control);
    // console.log(this.Status);
      if (this.Command_Control == null) { } else {
        if (this.Command_Control[0] === 0 ) {
          this.notchFilter();
        } else if (this.Command_Control[0] === 1 ) {
            this.patient_current_data = JSON.parse('{}');
            this.patientfile = '';
        } else if (this.Command_Control[0] === 2 ) {
            this.patientfile = this.Command_Control[1];
            this.assignData();
        } else if (this.Command_Control[0] === 3 ) {
          this.patient_current_data['debug']['time']['index'] = this.patient_current_data['debug']['time']['index'] 
          - this.Command_Control[1] * 10 * this.patient_current_data['channels'][0]['samplefrequency'];
          this.Jump();
        } else if (this.Command_Control[0] === 4 ) {
          this.patient_current_data['debug']['time']['index'] = this.patient_current_data['debug']['time']['index'] 
          + this.Command_Control[1] * 10 * this.patient_current_data['channels'][0]['samplefrequency'];
          this.Jump();
        } else if (this.Command_Control[0] === 5 ) {
            this.ocularFilter();
        } else if (this.Command_Control[0] === 6 ) {
            this.topoPlot(this.patient_current_data);
        } else if (this.Command_Control[0] === 7 ) {
            this.loretaFilter(this.patient_current_data);
        }
        this.Command_Control = null;
    }

    if (this.Status === 0) {
      this.visAnno = false;
      this.visEEG = true;
      this.visESI = false;
      this.visPlane = false;
      this.visTopoPLot = false;
    } else if (this.Status === 1) { // EEG+bviewer
      this.visAnno = false;
      this.visEEG = true;
      this.visESI = true;
      this.visPlane = false;
      this.visTopoPLot = false;
    } else if (this.Status === 2) {
      this.visAnno = false;
      this.visEEG = false;
      this.visESI = true;
      this.visPlane = true;
      this.visTopoPLot = false;
    } else if (this.Status === 3) {
      this.visAnno = true;
      this.visEEG = true;
      this.visESI = false;
      this.visPlane = false;
      this.visTopoPLot = false;
    } else if (this.Status === 4) { // EEG+topoplot
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
            if (this.Status === 4) { // EEG+topoplot
              this.topoPlot(this.patient_current_data);
            }
            if(this.Status === 1){
              this.loretaFilter(this.patient_current_data);
            }
        },
    (err) => {
        console.log(err);
    });
  }
  notchFilter() {
    this.d3service.getNotchFilter(this.patient_current_data).subscribe(
        (response: Response) => {
            this.patient_current_data = JSON.parse(JSON.stringify(response));
            if (this.Status === 4) { // EEG+topoplot
              this.topoPlot(this.patient_current_data);
            }
        },
    (err) => {
        console.log(err);
    });
  }
  ocularFilter() {
    this.d3service.getOcularFilter(this.patient_current_data).subscribe(
      (response: Response) => {
          this.patient_current_data = JSON.parse(JSON.stringify(response));
          if (this.Status === 4) { // EEG+topoplot
            this.topoPlot(this.patient_current_data);
          }
      }, (err) => {
        console.log(err);
      });
  }

  topoPlot(payload) {
    // console.log('EC-topoPlot before subscribe ');
    this.d3service.getTopoPlot(payload).subscribe(
      (response: Response) => {
        // this.patient_current_data = JSON.parse(JSON.stringify(response));
        // console.log('EC-topoPlot before response ',Object.getOwnPropertyNames(JSON.parse(JSON.stringify(response['buffer']))));
        const tempImg = JSON.parse(JSON.stringify(response));
        this.srcTopoPlot = 'data:image/png;base64,' + tempImg['buffer'];
        // console.log('EC-topoPlot after response ',this.srcTopoPlot.toString('base64'));

      }, (err) => {
        console.log(err);
    });
  }
  
  loretaFilter(payload) {
    // console.log('EC-loretaFilter before subscribe ');
    this.d3service.getLoretaFilter(payload).subscribe(
      (response: Response) => {
        this.brainColors = JSON.parse(JSON.stringify(response));
        
        // console.log('EC-loretaFilter after response ',this.brainColors);

      }, (err) => {
        console.log(err);
    });
  }

  onCursorEvent(event) {
    const cursor_index = event;
    const patient_data_copy = JSON.parse(JSON.stringify(this.patient_current_data));
    patient_data_copy['channels'].forEach(
      function(d) {
        d['data'] = d['data'].slice(cursor_index, cursor_index + d['samplefrequency']);
      }
    );
    // console.log('AMH-principal-component-curso-before', this.patient_current_data);
    // console.log('AMH-principal-component-cursor-after', patient_data_copy);
    if (this.Status === 4) { // EEG+topoplot
      this.topoPlot(patient_data_copy);
    }
    if (this.Status === 1) { // EEG+topoplot
      this.loretaFilter(patient_data_copy);
    }
    
  }
}
