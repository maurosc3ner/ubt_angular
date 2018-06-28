import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edf-menu-bar',
  templateUrl: './edf-menu-bar.component.html',
  styleUrls: ['./edf-menu-bar.component.css']
})
export class EdfMenuBarComponent {
  @Output() esiclick = new EventEmitter();
  @Output() planeclick = new EventEmitter();
  @Output() annoclick = new EventEmitter();

  ESILoad(event) {
    this.esiclick.emit(event);
  }

  PlaneLoad(event) {
    this.planeclick.emit(event);
  }

  AnnoLoad(event) {
    this.annoclick.emit(event);
  }
}
