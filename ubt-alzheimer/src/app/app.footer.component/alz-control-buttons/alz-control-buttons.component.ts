import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alz-control-buttons',
  templateUrl: './alz-control-buttons.component.html',
  styleUrls: ['./alz-control-buttons.component.css']
})
export class AlzControlButtonsComponent implements OnInit {
  
  @Output() startControlBar=new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onStartClick(event){
    // let msg=JSON.stringify({"command": "available_channels"});
    //this.mySocket.send(msg);
    let msg=  {'state':2};
    console.log('acb-onStartClick',msg);
    this.startControlBar.emit(msg);
  };


}
