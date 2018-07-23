import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public StatusControl = 0;
  public CommandControl;

  onChangeStatus(event) {
    this.StatusControl = event;
  }
  onCommandReceived(event) {
    this.CommandControl = event;
  }
}
