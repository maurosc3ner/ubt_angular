import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-control-bar-component',
  templateUrl: './app.control.bar.component.component.html',
  styleUrls: ['./app.control.bar.component.component.css']
})
export class AppControlBarComponent {
  @Output() ESIEvent = new EventEmitter();
  ESIToggle: Boolean = false;
  onESILoad(event) {
    if (this.ESIToggle === true) { this.ESIToggle = false; } else { this.ESIToggle = true; }
    this.ESIEvent.emit(this.ESIToggle);
  }
}
