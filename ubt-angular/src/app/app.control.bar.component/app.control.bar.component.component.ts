import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {D3Service } from '../app.services/d3/d3.service';

@Component({
  selector: 'app-control-bar-component',
  templateUrl: './app.control.bar.component.component.html',
  styleUrls: ['./app.control.bar.component.component.css']
})
export class AppControlBarComponent {
  @Output() StatusEvent = new EventEmitter();
  status: Number = 0;

  constructor(private d3Service: D3Service) {
    this.status = -1;
  }

  ESIToggle: Boolean = false;
  PlaneToggle: Boolean = false;
  AnnotToggle: Boolean = false;
  TopoPlotToggle: Boolean = false;

  checkStatus(ESIToggle, PlaneToggle, AnnotToggle, TopoPlotToggle) {
    if (PlaneToggle === true) {
      return 2;
    } else {
      if (ESIToggle === true) {
        return 1;
      }
      return 0;
    }
  }

  onESILoad(event) {
    if (this.ESIToggle === true) { this.ESIToggle = false; } else { this.ESIToggle = true; }
    this.status = this.checkStatus(this.ESIToggle, this.PlaneToggle, this.AnnotToggle, this.TopoPlotToggle);
    this.StatusEvent.emit(this.status);
  }

  onPlaneLoad(event) {
    if (this.PlaneToggle === true) { this.PlaneToggle = false; } else { this.PlaneToggle = true; }
    this.status = this.checkStatus(this.ESIToggle, this.PlaneToggle, this.AnnotToggle, this.TopoPlotToggle);
    this.StatusEvent.emit(this.status);
  }

  onAnnoLoad(event) {
    if (this.AnnotToggle === true) { this.AnnotToggle = false; } else { this.AnnotToggle = true; }
    this.status = this.checkStatus(this.ESIToggle, this.PlaneToggle, this.AnnotToggle, this.TopoPlotToggle);
    this.StatusEvent.emit(this.status);
  }

}
