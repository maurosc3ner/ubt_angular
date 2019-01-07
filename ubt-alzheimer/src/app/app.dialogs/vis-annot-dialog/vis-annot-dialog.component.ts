import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material/dialog';


@Component({
  selector: 'vis-annot-dialog',
  templateUrl: './vis-annot-dialog.component.html',
  styleUrls: ['./vis-annot-dialog.component.css']
})
export class VisAnnotDialogComponent implements OnInit {
  public myAnnot: any;
  constructor(public thisDialogRef: MatDialogRef<VisAnnotDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.myAnnot=this.data;
  }

  ngOnInit() {
  }

  onCloseConfirm(){
    this.thisDialogRef.close({
      
    });
  }

  onCloseCancel(){
    this.thisDialogRef.close('null');
  }

  

}
