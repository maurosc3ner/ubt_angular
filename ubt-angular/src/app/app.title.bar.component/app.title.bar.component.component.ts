import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-title-bar-component',
  templateUrl: './app.title.bar.component.component.html',
  styleUrls: ['./app.title.bar.component.component.css']
})
export class AppTitleBarComponent implements OnChanges {
  @Input() Patient_Info;
  @Input() Status_title;
  PatientStatus: Boolean = false;
  PatientInfo: JSON;
  ngOnChanges() {
    if ( this.Patient_Info === undefined ) {
      this.PatientStatus = false;
    } else {
        if (this.Status_title[0] === 1) {
          this.PatientStatus = false;
        } else {
          this.PatientStatus = true;
          this.PatientInfo = this.Patient_Info['patientInfo'];
        }
        console.log('AMH-Title', this.PatientInfo);
    }

  }
}
