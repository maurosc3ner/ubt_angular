import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material/dialog';


@Component({
  selector: 'app-annot-dialog',
  templateUrl: './annot-dialog.component.html',
  styleUrls: ['./annot-dialog.component.css']
})
export class AnnotDialogComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<AnnotDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:string) { }
  annotType='';
  annotDesc='';
  ngOnInit() {
  }

  onCloseConfirm(){
    this.thisDialogRef.close({
      'annotType': this.annotType,
      'annotDesc': this.annotDesc
    });
  }

  onCloseCancel(){
    this.thisDialogRef.close('null');
  }

  

}
