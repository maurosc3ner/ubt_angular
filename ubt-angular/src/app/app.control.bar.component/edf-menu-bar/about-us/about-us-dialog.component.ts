import { Component,Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-about-us-dialog',
  templateUrl: './about-us-dialog.component.html',
  styleUrls: ['./about-us-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AboutUsDialogComponent {

  myModel: any;
  selected: Number;
  constructor(public thisDialogRef: MatDialogRef<AboutUsDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { 
    this.myModel= {};
    this.myModel=data;
  }

  onCloseCancel(){
    this.thisDialogRef.close(false);
  }
}
