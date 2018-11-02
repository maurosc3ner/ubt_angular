import { Component, OnInit, Output, EventEmitter,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-alz-connect-bar',
  templateUrl: './alz-connect-bar.component.html',
  styleUrls: ['./alz-connect-bar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AlzConnectBarComponent implements OnInit {

  @Output() portFromConnectBar=new EventEmitter();
  ngOnInit() {
  }
  port=8890;

  onConnectClick(event){
    let msg=  {'port':this.port, 'state':1};
    console.log('acb-onUserInput',msg);
    this.portFromConnectBar.emit(msg);
  };

}
