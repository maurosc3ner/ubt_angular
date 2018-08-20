import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import {D3Service } from '../app.services/d3/d3.service';

@Component({
  selector: 'app-control-bar-component',
  templateUrl: './app.control.bar.component.component.html',
  styleUrls: ['./app.control.bar.component.component.css']
})
export class AppControlBarComponent {
  @Output() StatusEvent = new EventEmitter();
  @Output() CoomandEvent = new EventEmitter();
  status: Number = 0;
  constructor(private d3Service: D3Service) {
    this.status = -1;
  }

  ESIToggle: Boolean = false;
  PlaneToggle: Boolean = false;
  AnnotToggle: Boolean = false;
  TopoPlotToggle: Boolean = false;

  checkStatus(ESIToggle, PlaneToggle, AnnotToggle, TopoPlotToggle) {
    if (TopoPlotToggle === true) {
      return 4;
    } else if (AnnotToggle === true) {
        return 3;
      } else if (PlaneToggle === true) {
          return 2;
        } else if (ESIToggle === true) {
            return 1;
          } else return 0;
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
  onTopoFilter(event) {
    if (this.TopoPlotToggle === true) { 
      this.TopoPlotToggle = false; 
    } else { 
      this.TopoPlotToggle = true;
      this.CoomandEvent.emit([5, 0]);
    }
    this.status = this.checkStatus(this.ESIToggle, this.PlaneToggle, this.AnnotToggle, this.TopoPlotToggle);
    this.StatusEvent.emit(this.status);
  }
  onNotchFilter(event) {
    this.CoomandEvent.emit([0, 0]);
  }
  onClear(event) {
    this.CoomandEvent.emit([1, 0]);
  }
  onOpenEDF(event) {
    this.CoomandEvent.emit([2, event]);
  }
  onGoBack(event) {
    this.CoomandEvent.emit([3, event]);
  }
  onGoForwd(event) {
    this.CoomandEvent.emit([4, event]);
  }
  onOcularFilter(event) {
    this.CoomandEvent.emit([5, 0]);
  }
}
