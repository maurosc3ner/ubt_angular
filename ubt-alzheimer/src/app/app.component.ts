import { Component, Input, Output } from '@angular/core';
import { AlzServices } from './app.services/alzservices';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'app';
  public CurrentState = 0;
  public CommandControl;
  myPort;
  mySocket;
  @Input() testInput;
  
  constructor(private myServices: AlzServices) {
  }

  onChangeStatus(event) {
    this.CurrentState = event;
  }
  onCommandReceived(event) {
    this.CommandControl = event;
  }

  onChangeState(event){
    console.log('root-onChangeState',event);
    if ( event['state'] == 1){
      this.connectDriver(event);
    }else if ( event['state'] == 2){
      this.startStream(event);
    }
    
  }

  /*

  */
  connectDriver(event) {
    this.myPort = event['port'];
    this.mySocket = new WebSocket("ws://localhost:"+this.myPort+"/ws");
    this.mySocket.onopen = event=>{
      console.log("WebSocket is open now.",event,this.mySocket);
      this.CurrentState = 1; 
    };
    this.mySocket.onclose = event=> {
      console.log("WebSocket is closed now.",event);
      this.CurrentState = 0; 
    };
  }

  startStream(event) {
    console.log("Starting streaming",event);
    let msg=JSON.stringify({"command": "available_channels"});
    this.mySocket.send(msg);

    msg=JSON.stringify({"command": "request_channels", 
            "labels": []
    });
    this.mySocket.send(msg); 

    this.mySocket.onmessage = event=>{
      var myObj=JSON.parse(event.data);
      console.log(myObj);
    };
  }

  
}
