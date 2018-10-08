import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alz-control-buttons',
  templateUrl: './alz-control-buttons.component.html',
  styleUrls: ['./alz-control-buttons.component.css']
})
export class AlzControlButtonsComponent implements OnInit {
  
  @Output() startControlBar=new EventEmitter();
  @Output() annoControlBar=new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onStartClick(event){
    
    let msg=  {'state':2};
    //console.log('acb-onStartClick',msg); probado y OK
    this.startControlBar.emit(msg);
  };

  onAddAnnoClick(event){
    let msg=  {'state':3};
    //console.log('acb-onAddAnnoClick'); probado y OK
    this.annoControlBar.emit(msg);
  }


}
