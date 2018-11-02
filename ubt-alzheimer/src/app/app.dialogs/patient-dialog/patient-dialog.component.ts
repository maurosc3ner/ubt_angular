import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material/dialog';
@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PatientDialogComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<PatientDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:string) { }
  adminCode='';
  equipment='';
  patientCode='';
  patientName='';
  patientAdditional='';
  recordingAdditional='';
  technician='';

  ngOnInit() {
    this.patientInfo["adminCode"]='';
  }

  patientInfo={};

  onCloseConfirm(){
    this.thisDialogRef.close({
      'adminCode': this.adminCode,
      'equipment': this.equipment,
      'patientCode': this.patientCode,
      'patientName': this.patientName,
      'patientAdditional' : this.patientAdditional,
      'recordingAdditional' : this.recordingAdditional,
      'technician': this.technician

    });

  }

  onCloseCancel(){
    this.thisDialogRef.close('Canceled');
  }

}
