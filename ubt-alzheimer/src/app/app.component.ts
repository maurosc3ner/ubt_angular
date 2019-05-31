import { Component, Input, Output } from '@angular/core';
import { MatDialog } from '../../node_modules/@angular/material/dialog';
import { PatientDialogComponent } from './app.dialogs/patient-dialog/patient-dialog.component';
import {AnnotDialogComponent} from './app.dialogs/annot-dialog/annot-dialog.component';
import {VisAnnotDialogComponent} from './app.dialogs/vis-annot-dialog/vis-annot-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public isStreaming: boolean;
  
  constructor(public snackBar: MatSnackBar, 
      public patientDialog: MatDialog, 
      public annodialog: MatDialog,
      public listannodialog: MatDialog) {
    this.currentSession["patientInfo"]={};
    this.currentSession["annotations"]={
      "size" : 0,
      "items" :[]
    };
    this.isStreaming=false;
  }

  onChangeStatus(event) {
    this.CurrentState = event;
  }
  onCommandReceived(event) {
    this.CommandControl = event;
  }

  onChangeState(event){
    console.log('root-onChangeState',event,this.current_channels);

    if ( event['state'] == 1){
      this.connectDriver(event);
    }else if ( event['state'] == 2){
      if (!this.isStreaming)
        this.startStream(event);
    } else if ( event['state'] == 3){ // annotation but still running

      let dialogRef=this.annodialog.open(AnnotDialogComponent,{
        width: '800px',
        height: '400px',
         // ojo FALTA verificar si es el ultimo enddate porque difieren de tendencias y de waves
        // data: this.convertDateTimestamp(this.current_channels["debug"]["subrecords"]["enddatetime"])
        data: this.ToLocalDate(new Date(this.current_channels["debug"]["subrecords"]["enddatetime"]*1000))
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.CurrentState = 3;
          this.annotDialogResult={};
          this.annotDialogResult["description"]=result["annotDesc"];
          
          this.annotDialogResult['onset']=(this.current_channels["debug"]["subrecords"]["enddatetime"]-this.current_channels["debug"]["subrecords"]["startdatetime"]);
          this.annotDialogResult['duration']=0.04;
          console.log('acb-onAddAnnoClick',this.annotDialogResult);
          this.currentSession["annotations"]["items"].push(this.annotDialogResult);
          this.currentSession["annotations"]["size"]+=1;
          this.CurrentState = 2;
          this.snackBar.open("Anotación agregada satisfactoriamente", 'Aceptar', {
            duration: 3000,
          });
        }

      });

    } else if ( event['state'] == 4){
      if(this.isStreaming){
        this.stopStream(event);
        this.snackBar.open("Driver detenido satisfactoriamente", 'Aceptar', {
          duration: 3000,
        });
      }
    } else if ( event['state'] == 5){
      
      if (JSON.stringify(this.current_channels) != JSON.stringify({})){
        let dialogRef=this.patientDialog.open(PatientDialogComponent,{
          width: '800px',
          height: '600px',
          data: 'test'
        });
    
        dialogRef.afterClosed().subscribe(result=>{
          console.log(result);
          if(result){
            this.patientDialogResult=result;
            this.saveStream(result,event);
            // this.stopStream(event);
          }
        });

      }else{
        this.snackBar.open("Debe comenzar la sesión para poder grabarla!", 'Aceptar', {
          duration: 3000,
        });
      }
    } else if ( event['state'] == 6){ // ver anotaciones
      let tempAnnot = [];
      this.currentSession["annotations"]["items"].forEach(element => {
        let tempElement={};
        tempElement=JSON.parse(JSON.stringify(element));
        tempElement["currentAnnotTime"]=this.convertHourTimestamp(this.ToLocalDate(new Date((this.current_channels["debug"]["subrecords"]["startdatetime"]+tempElement["onset"])*1000)));
        tempAnnot.push(tempElement);
      });
        
      let dialogRef=this.listannodialog.open(VisAnnotDialogComponent,{
        width: '800px',
        height: '600px',
        data: tempAnnot
      });
  
      dialogRef.afterClosed().subscribe(result=>{
        console.log(result);
      });
    }

  }

  /*

  */
  connectDriver(event) {
    this.myPort = event['port'];
    try {
      this.mySocket = new WebSocket("ws://localhost:"+this.myPort+"/ws");
    } catch (error) {
      
    }
    
    
    
    this.mySocket.onerror = event=>{
      console.log("WebSocket error observed",event);
      this.CurrentState = 0; 
      this.snackBar.open("Revise el driver y su puerto de conexión", 'Aceptar', {
        duration: 3000,
      });
    };
    
    this.mySocket.onopen = event=>{
      console.log("WebSocket is open now.",event,this.mySocket);
      this.CurrentState = 1; 
      
    };
    this.mySocket.onclose = event=> {
      console.log("WebSocket is closed now.",event);
      this.CurrentState = 0; 
      this.snackBar.open("Conexión cerrada satisfactoriamente", 'Aceptar', {
        duration: 3000,
      });
      
    };
  }

  startStream(event) {
    let msg=JSON.stringify({
      "command": "available_channels"
    });
    this.mySocket.send(msg);

    msg=JSON.stringify({
      "command": "request_channels", 
      "labels": [],
      "resampled": 0.25,
      "buffer": 2
    });

    this.mySocket.send(msg); 
    this.CurrentState=2;
    this.mySocket.onmessage = event=>{
      let msgFromUBT=JSON.parse(event.data);
      msgFromUBT["annotations"]=this.currentSession["annotations"]
      this.current_channels=msgFromUBT;
      this.isStreaming=true;
    };
  }

  stopStream(event){
    let msg=JSON.stringify({"command": "stop_transfer"});
    this.mySocket.send(msg);
    this.CurrentState=1;
    this.mySocket.onmessage = event=>{
      this.current_channels=JSON.parse(event.data);
      this.isStreaming=false;
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
      console.log(JSON.parse(event.data));
      this.current_channels=JSON.parse(event.data);
      this.stopStream(event);
      this.snackBar.open("Sesión guardada y terminada satisfactoriamente", 'Aceptar', {
        duration: 3000,
      });
      
    };
  }

  convertHourTimestamp(mydate) {
    let d = mydate, // Convert the passed timestamp to milliseconds since javascript works in mili
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),    // Add leading 0.
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
    // 3:00:15s PM
    time = h + ':' + min +':'+seg+' ' + ampm;
    return time;
  }

  ToLocalDate (inDate) {
    var date = new Date();
    date.setTime(inDate.valueOf() + 60000 * inDate.getTimezoneOffset());
    return date;
  }
  
}
