import { Component, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edf-menu-bar',
  templateUrl: './edf-menu-bar.component.html',
  styleUrls: ['./edf-menu-bar.component.css']
})
export class EdfMenuBarComponent {
  @Output() esiclick = new EventEmitter();
  @Output() planeclick = new EventEmitter();
  @Output() annoclick = new EventEmitter();
  @Output() clearclick = new EventEmitter();
  @Output() notchfilterclick = new EventEmitter();
  @Output() topoclick = new EventEmitter();
  @Output() openclick = new EventEmitter();
  @ViewChild('fileinput') fileinput;

  ESILoad(event) {
    this.esiclick.emit(event);
  }
  PlaneLoad(event) {
    this.planeclick.emit(event);
  }
  AnnoLoad(event) {
    this.annoclick.emit(event);
  }
  Clear(event) {
    this.clearclick.emit(event);
  }
  notchFilter(event) {
    this.notchfilterclick.emit(event);
  }
  TopoPlot(event) {
    this.topoclick.emit(event);
  }
  OpenEDF(event) {
    console.log(event['target']['files'][0]['name']);
    this.openclick.emit(event['target']['files'][0]['name']);
  }
  SelectFiles(event) {
    event.click();
  }
}
