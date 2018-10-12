import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {AnnotDialogComponent} from './annot-dialog/annot-dialog.component';
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
  currentTimeStamp;
  ngOnInit() {
  }

  ngOnChanges() {
    
    // });
    if (!this.isEmpty(this.current_data)){
      console.log('annotacion-current',this.current_data['debug']["subrecords"]);
      this.currentTimeStamp=new Date(this.current_data["debug"]["subrecords"]["enddatetime"]*1000);
    }
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
    console.log(this.current_data);
    let dialogRef=this.annodialog.open(AnnotDialogComponent,{
      width: '1024px',
      height: '400px',
      data: this.currentTimeStamp.toISOString()
    });

    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
      this.annotDialogResult=result;
    });
    //console.log('acb-onAddAnnoClick'); probado y OK
    this.annoControlBar.emit(msg);
  }

  isEmpty(obj) {
    return Object.keys(obj).every(k => !Object.keys(obj[k]).length)
  }

  convertTimestamp(timestamp) {
    let d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
        ampm = 'AM',
        time;
    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }
    // ie: 2014-03-24, 3:00 PM
    time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
    return time;
  }

}
