import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}
@Component({
  selector: 'app-edf-file-dialog',
  templateUrl: './edf-file-dialog.component.html',
  styleUrls: ['./edf-file-dialog.component.css']
})
export class EdfFileDialogComponent {

  myModel: any;
  selected: Number;
  constructor(public thisDialogRef: MatDialogRef<EdfFileDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { 
    this.myModel= {};
    this.myModel=data;
  }

  onCloseConfirm(){
    const myArray=this.myModel.files;
    console.log("selec",this.selected);
    myArray.forEach((fileElem,idx) => {
       if (fileElem.value == this.selected){
        console.log("file selected ",fileElem,idx );
        this.thisDialogRef.close(fileElem);
       }
        
    });

    

  }

  onCloseCancel(){
    this.thisDialogRef.close('Canceled');
  }
}
