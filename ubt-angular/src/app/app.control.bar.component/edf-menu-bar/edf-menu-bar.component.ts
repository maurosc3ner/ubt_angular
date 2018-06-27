import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edf-menu-bar',
  templateUrl: './edf-menu-bar.component.html',
  styleUrls: ['./edf-menu-bar.component.css']
})
export class EdfMenuBarComponent {
  @Output() esiclick = new EventEmitter();

  ESILoad(event) {
    this.esiclick.emit(event);
  }
}
