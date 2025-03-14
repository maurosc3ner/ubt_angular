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
  public mainBridge = 0;
  public PatientInfo;
  public WizardStatus: Boolean = true;

  onChangesToolbar(event) {
    if (this.mainBridge === 0) {
      this.mainBridge = 1;
    } else {
      this.mainBridge = 0;
    }
  }

  onChangesPatientInfo(event) {
    this.PatientInfo = event;
  }

  onChangeStatus(event) {
    this.StatusControl = event;
    // console.log('AMG', event);
  }
  onCommandReceived(event) {
    this.CommandControl = event;
  }

  onChangeWizardStatus(event) {
    this.WizardStatus = !this.WizardStatus;
    console.log(this.WizardStatus);
  }
}
