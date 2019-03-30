import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// import {AnnotDialogComponent} from './annot-dialog/annot-dialog.component';
import { MatDialog } from '../../../../node_modules/@angular/material/dialog';

@Component({
  selector: 'app-alz-control-buttons',
  templateUrl: './alz-control-buttons.component.html',
  styleUrls: ['./alz-control-buttons.component.css']
})
export class AlzControlButtonsComponent implements OnInit {
  @Input() current_data = null;
  @Output() startControlBar=new EventEmitter();
  @Output() annoControlBar=new EventEmitter();
  annotDialogResult={};
  constructor(public annodialog: MatDialog) { }

  ngOnInit() {
  }


  onStartClick(event){
    let msg=  {'state':2};
    //console.log('acb-onStartClick',msg); probado y OK
    this.startControlBar.emit(msg);
  };

  onStopClick(event){
    let msg=  {'state':4};
    //console.log('acb-onStartClick',msg); probado y OK
    this.startControlBar.emit(msg);
  };

  onAddAnnoClick(event){
    let msg=  {'state':3};
    this.annoControlBar.emit(msg);
  }
  onListAnnoClick(event){
    let msg=  {'state':6};
    this.startControlBar.emit(msg);
  }

  onSaveClick(event){
    let msg=  {'state':5};
    //console.log('acb-onStartClick',msg); probado y OK
    this.startControlBar.emit(msg);
  };

  isEmpty(obj) {
    return Object.keys(obj).every(k => !Object.keys(obj[k]).length)
  }

}
