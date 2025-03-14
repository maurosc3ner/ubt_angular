import { Component, Input, OnInit, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { D3Service } from '../app.services/d3/d3.service';
import {last, tap, take, finalize} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-principal-content-component',
  templateUrl: './app.principal.content.component.component.html',
  styleUrls: ['./app.principal.content.component.component.css']
})
export class AppPrincipalContentComponent implements OnInit, OnChanges {
  @Input() Status: number;
  @Input() Command_Control;
  @Output() componentsBridge = new EventEmitter();
  @Output() titleEmmiter = new EventEmitter();
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
  brainColors: JSON;
constructor(private d3service: D3Service, public snackBar: MatSnackBar) {
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
    console.log('Command', this.Command_Control);
    console.log('Status', this.Status);
      if (this.Command_Control == null) { } else {
        if (this.Command_Control[0] === 0 ) {
          this.notchFilter();
        } else if (this.Command_Control[0] === 1 ) {
            this.patient_current_data = JSON.parse('{}');
            this.patientfile = null;
        } else if (this.Command_Control[0] === 2 ) {
            this.patientfile = this.Command_Control[1];
            this.assignData();
        } else if (this.Command_Control[0] === 3 ) {
          this.patient_current_data['debug']['time']['index'] =
          this.patient_current_data['debug']['time']['index'] -
          this.Command_Control[1] * 10 * this.patient_current_data['channels'][0]['samplefrequency'];
          this.Jump();
        } else if (this.Command_Control[0] === 4 ) {
          this.patient_current_data['debug']['time']['index'] =
          this.patient_current_data['debug']['time']['index'] +
          this.Command_Control[1] * 10 * this.patient_current_data['channels'][0]['samplefrequency'];
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
    } else if (this.Status === 3) { // EEG + Anotaciones
      console.log(this.patient_current_data);
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
          const serverResponse = JSON.parse(JSON.stringify(response));
          if (serverResponse.hasOwnProperty('dbgmsg')) {
            this.snackBar.open(serverResponse['dbgmsg'], 'Aceptar', {
              duration: 3000,
            });
          }
          this.patient_current_data = JSON.parse(JSON.stringify(serverResponse.response));
          this.titleEmmiter.emit(this.patient_current_data);
        },
    (err) => {
        console.log(err);
    });
  }
  Jump() {
    const jump = this.d3service.getJump(this.patient_current_data);
    jump.pipe(
      tap((response) => this.patient_current_data = JSON.parse(JSON.stringify(response))),
      take(1),
      finalize(() => {
        console.log('finalized');
        if (this.Status === 4) { // EEG+topoplot
          this.topoPlot(this.patient_current_data);
        }
        if (this.Status === 1) {
          this.loretaFilter(this.patient_current_data);
        }
      }))
      .subscribe((response: Response) => response);
  }

  bridgeSignals(event) {
    console.log('EC-apc-bridgeSignals llegue arriba', event);
    this.componentsBridge.emit(event);
  }

  notchFilter() {
    const notch = this.d3service.getNotchFilter(this.patient_current_data);
    notch.pipe(
      tap((response) => {
        const serverResponse = JSON.parse(JSON.stringify(response));
        if (serverResponse.hasOwnProperty('dbgmsg')) {
          this.snackBar.open(serverResponse['dbgmsg'], 'Aceptar', {
            duration: 3000,
          });
        }
        this.patient_current_data = JSON.parse(JSON.stringify(serverResponse.response));
      }),
      take(1),
      finalize(() => {
        console.log('finalized');
        if (this.Status === 4) { // EEG+topoplot
          this.topoPlot(this.patient_current_data);
        }
        if (this.Status === 1) {
          this.loretaFilter(this.patient_current_data);
        }
      }))
    .subscribe((response: Response) => response);
  }
  ocularFilter() {
    const ocular = this.d3service.getOcularFilter(this.patient_current_data);
    ocular.pipe(
      tap((response) => {
        const serverResponse = JSON.parse(JSON.stringify(response));
        if (serverResponse.hasOwnProperty('dbgmsg')) {
          this.snackBar.open(serverResponse['dbgmsg'], 'Aceptar', {
            duration: 3000,
          });
        }
        this.patient_current_data = JSON.parse(JSON.stringify(serverResponse.response));
        this.componentsBridge.emit(event);
      }),
      take(1),
      finalize(() => {
        console.log('finalized');
        if (this.Status === 4) { // EEG+topoplot
          this.topoPlot(this.patient_current_data);
        }
        if (this.Status === 1) {
          this.loretaFilter(this.patient_current_data);
        }
      }))
    .subscribe((response: Response) => response);
  }
  topoPlot(payload) {
    // console.log('EC-topoPlot before subscribe ');
    const topoplot = this.d3service.getTopoPlot(payload);
    topoplot.pipe(
      tap((response) => {
        const serverResponse = JSON.parse(JSON.stringify(response));
        if (serverResponse.hasOwnProperty('dbgmsg')) {
          this.snackBar.open(serverResponse['dbgmsg'], 'Aceptar', {
            duration: 3000,
          });
        }
        this.srcTopoPlot = 'data:image/png;base64,' + serverResponse['buffer'];
      }),
      take(1),
      finalize(() => {
      }))
    .subscribe((response: Response) => response);
  }
  loretaFilter(payload) {
    const brain = this.d3service.getLoretaFilter(payload);
    brain.pipe(
      tap((response) => {
        const serverResponse = JSON.parse(JSON.stringify(response));
        if (serverResponse.hasOwnProperty('dbgmsg')) {
          this.snackBar.open(serverResponse['dbgmsg'], 'Aceptar', {
            duration: 3000,
          });
        }
        this.brainColors =  JSON.parse(serverResponse.response);
      }),
      take(1),
      finalize(() => {
      }))
    .subscribe((response: Response) => response);
  }
  onCursorEvent(event) {
    const cursor_index = event;
    const patient_data_copy = JSON.parse(JSON.stringify(this.patient_current_data));
    patient_data_copy['channels'].forEach(
      function(d) {
        d['data'] = d['data'].slice(cursor_index, cursor_index + d['samplefrequency']);
      }
    );
    if (this.Status === 4) { // EEG+topoplot
      this.topoPlot(patient_data_copy);
    }
    if (this.Status === 1) { // EEG+loreta
      this.loretaFilter(patient_data_copy);
    }
  }
}
