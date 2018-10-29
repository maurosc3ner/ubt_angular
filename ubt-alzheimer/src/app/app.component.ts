import { Component, Input, Output } from '@angular/core';
import { MatDialog } from '../../node_modules/@angular/material/dialog';
import { PatientDialogComponent } from './app.dialogs/patient-dialog/patient-dialog.component';
// import { AlzServices } from './app.services/alzservices';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'app';
  public CurrentState = 0;
  public current_channels={};
  public CommandControl;
  myPort;
  mySocket;
  @Input() testInput;
  patientDialogResult={};

  constructor(public patientDialog: MatDialog) { }

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
    } else if ( event['state'] == 3){
      this.CurrentState = 3;
    } else if ( event['state'] == 4){
      this.stopStream(event);
    } else if ( event['state'] == 5){
      //this.stopStream(event);
      let dialogRef=this.patientDialog.open(PatientDialogComponent,{
        width: '1024px',
        height: '600px',
        data: 'test'
      });
  
      dialogRef.afterClosed().subscribe(result=>{
        console.log(result);
        this.patientDialogResult=result;
      });
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
    let msg=JSON.stringify({
      "command": "available_channels"
    });
    this.mySocket.send(msg);

    msg=JSON.stringify({
      "command": "request_channels", 
      "labels": []
    });

    this.mySocket.send(msg); 
    this.CurrentState=2;
    this.mySocket.onmessage = event=>{
      this.current_channels=JSON.parse(event.data);
      //console.log(myObj);
    };
  }

  stopStream(event){
    let msg=JSON.stringify({"command": "stop_transfer"});
    this.mySocket.send(msg);
    this.CurrentState=1;
    this.mySocket.onmessage = event=>{
      this.current_channels=JSON.parse(event.data);
      //console.log(myObj);
    };
  }

  
}
