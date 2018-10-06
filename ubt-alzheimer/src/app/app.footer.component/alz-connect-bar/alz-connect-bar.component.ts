import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alz-connect-bar',
  templateUrl: './alz-connect-bar.component.html',
  styleUrls: ['./alz-connect-bar.component.css']
})
export class AlzConnectBarComponent implements OnInit {

  @Output() portFromConnectBar=new EventEmitter();
  ngOnInit() {
  }
  port='';

  onConnectClick(event){
    let msg=  {'port':this.port, 'state':1};
    console.log('acb-onUserInput',msg);
    this.portFromConnectBar.emit(msg);
    
    // this.mySocket = new WebSocket("ws://localhost:8890/ws");

    // this.mySocket.onopen = event=>{
    //   console.log("WebSocket is open now.",event);
      
    //   //aqui emito hacia afuera que ya me conecte satisfactoriamente
    //   //y que puedo pasar a la vista de pedir muestras
    // };
    
    // this.mySocket.onmessage = event=>{
    //   var myObj=JSON.parse(event.data);
    //   console.log(myObj);
    // };

    // this.mySocket.onclose = function(event) {
    //   console.log("WebSocket is closed now.");
    // };
  };
  // onUserInput(event) {
  //   console.log('cartcomp-onUserInput',event.target.value);
  //   //this.port = event.target.value; 
  //   // this.name2 = event.target.value;
  // }
}
