import { Component, Input, Output } from '@angular/core';
import { MatDialog } from '../../node_modules/@angular/material/dialog';
import { PatientDialogComponent } from './app.dialogs/patient-dialog/patient-dialog.component';
import {AnnotDialogComponent} from './app.dialogs/annot-dialog/annot-dialog.component';
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
  annotDialogResult={};
  public currentSession={};
  



  constructor(public patientDialog: MatDialog, public annodialog: MatDialog) {
    this.currentSession["patientInfo"]={};
    this.currentSession["annotations"]={
      "size" : 0,
      "items" :[]
    };

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
    } else if ( event['state'] == 3){ // annotation but still running 
      this.CurrentState = 3;
      console.log(this.current_channels);
      let dialogRef=this.annodialog.open(AnnotDialogComponent,{
        width: '800px',
        height: '400px',
        // data: this.currentTimeStamp.toISOString()
        // ojo FALTA verificar si es el ultimo enddate porque difieren de tendencias y de waves
        data: this.convertTimestamp(this.current_channels["debug"]["subrecords"]["enddatetime"])
      });

      dialogRef.afterClosed().subscribe(result=>{
        
        // agregar logica para detectar si es null el result para no crear anotacion
        this.annotDialogResult={};
        this.annotDialogResult["description"]=result["annotType"]+' - '+result["annotDesc"];
        // onset se debe grabar como segundos relativos
        this.annotDialogResult['onset']=(this.current_channels["debug"]["subrecords"]["enddatetime"]-this.current_channels["debug"]["subrecords"]["startdatetime"]).toFixed(1);
        this.annotDialogResult['duration']=0.04;
        console.log('acb-onAddAnnoClick',this.annotDialogResult);
        this.currentSession["annotations"]["items"].push(this.annotDialogResult);
        this.currentSession["annotations"]["size"]+=1;
        console.log('acb-onAddAnnoClick',this.currentSession["annotations"]);
      });

    } else if ( event['state'] == 4){
      this.stopStream(event);
    } else if ( event['state'] == 5){
     
      let dialogRef=this.patientDialog.open(PatientDialogComponent,{
        width: '800px',
        height: '600px',
        data: 'test'
      });
  
      dialogRef.afterClosed().subscribe(result=>{
        console.log(result);
        this.patientDialogResult=result;
        this.saveStream(result,event);
        this.stopStream(event);

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

  /*

  */
  saveStream(patientInfo,event) {
    this.currentSession["command"]="get_edf";
    this.currentSession["patientInfo"]=patientInfo;

    console.log(JSON.stringify(this.currentSession));
    this.mySocket.send(JSON.stringify(this.currentSession));
    this.CurrentState=0;
    this.mySocket.onmessage = event=>{
      this.current_channels=JSON.parse(event.data);
      this.stopStream(event);
      //console.log(myObj);
    };
  }

  convertTimestamp(timestamp) {
    let d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
        seg = ('0' + d.getSeconds()).slice(-2),     // Add leading 0. 
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
    time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min +':'+seg+' ' + ampm;
    return time;
  }

  
}
