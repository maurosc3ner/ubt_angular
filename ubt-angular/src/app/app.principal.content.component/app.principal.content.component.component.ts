import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-principal-content-component',
  templateUrl: './app.principal.content.component.component.html',
  styleUrls: ['./app.principal.content.component.component.css']
})
export class AppPrincipalContentComponent implements OnInit, OnChanges {
  @Input() EEGstatus: Boolean;
  @Input() topoPlotStatus: Boolean;
  @Input() ESIstatus: Boolean;
  @Input() planeView: Boolean;

  sortcomponents: String;

  constructor() {
  }

  ngOnInit() {
    this.EEGstatus = true;
    this.topoPlotStatus = false;
    this.ESIstatus = false;
    this.planeView = false;
  }

  ngOnChanges() {
    if (this.ESIstatus === true) {
      this.sortcomponents = '50%';
    }
  }
}
