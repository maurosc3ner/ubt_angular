import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {D3Service } from '../app.services/d3/d3.service';

@Component({
  selector: 'app-control-bar-component',
  templateUrl: './app.control.bar.component.component.html',
  styleUrls: ['./app.control.bar.component.component.css']
})
export class AppControlBarComponent {
  @Output() StatusEvent = new EventEmitter();
  @Output() CoomandEvent = new EventEmitter();
  @Input() newStatusEvent;
  status: Number = 0;
  constructor(private d3Service: D3Service) {
  }

  ESIToggle: Boolean = false;
  PlaneToggle: Boolean = false;
  AnnotToggle: Boolean = false;
  TopoPlotToggle: Boolean = false;

  ngOnChanges(): void {
    console.log('EC-onchanges',this.newStatusEvent);
    // this.onTopoFilter(true);
    console.log('AMH-Checkstatus', this.status, this.ESIToggle, this.PlaneToggle, this.AnnotToggle, this.TopoPlotToggle);
    
    
  }

  checkStatus(ESIToggle, PlaneToggle, AnnotToggle, TopoPlotToggle) {
    console.log('AMH-Checkstatus', this.status, ESIToggle, PlaneToggle, AnnotToggle, TopoPlotToggle);
    if ((ESIToggle || PlaneToggle || AnnotToggle || TopoPlotToggle) === false) {
      return 0;
    } else {
      if (this.status === 0) {
        if (TopoPlotToggle === true) {
          return 4;
        }
        if (AnnotToggle === true) {
          return 3;
        }
        if (PlaneToggle === true) {
          return 2;
        }
        if (ESIToggle === true) {
          return 1;
        }
      } else {
        // State machine logic
        if (this.status === 1) {
          ESIToggle = false;
          this.status = 0;
        }
        if (this.status === 2) {
          PlaneToggle = false;
          this.status = 0;
        }
        if (this.status === 3) {
          AnnotToggle = false;
          this.status = 0;
        }
        if (this.status === 4) { // topoplot
          TopoPlotToggle = false;
          this.status = 0;
        }
        console.log('checkstatus');
        return this.checkStatus(ESIToggle, PlaneToggle, AnnotToggle, TopoPlotToggle);
      }
    }
  }

  onESILoad(event) {
    if (this.ESIToggle === true) {
      this.ESIToggle = false;
    } else {
      this.CoomandEvent.emit([7, 0]);
      this.ESIToggle = true;
    }
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
    console.log("onTopoFilter",event);
    if (this.TopoPlotToggle === true) {
      this.TopoPlotToggle = false;
    } else {
      this.TopoPlotToggle = true;
      this.CoomandEvent.emit([6, 0]);
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
