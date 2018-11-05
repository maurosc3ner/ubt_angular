import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public StatusControl = 0;
  public CommandControl;

  mainBridge;

  onChangesToolbar(event){
    console.log('EC-app-',event);
    this.mainBridge=event;
    //this.mainBridge.emit();
  }

  onChangeStatus(event) {
    this.StatusControl = event;
    
  }
  onCommandReceived(event) {
    this.CommandControl = event;
  }
}
