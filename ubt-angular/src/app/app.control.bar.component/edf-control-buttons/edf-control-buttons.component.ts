import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edf-control-buttons',
  templateUrl: './edf-control-buttons.component.html',
  styleUrls: ['./edf-control-buttons.component.css']
})
export class EdfControlButtonsComponent {
  @Output() goBackward = new EventEmitter();
  @Output() goForward = new EventEmitter();
  step = [1, 3, 6];
  stepPos = 0;
  Backward(event, step = this.step[this.stepPos]) {
    this.goBackward.emit(step);
  }
  Forward(event, step = this.step[this.stepPos]) {
    this.goForward.emit(step);
  }
  changeStep(event, direction: boolean) {
    if (direction) {
      if (this.stepPos === this.step.length - 1) {
          this.stepPos = this.step.length - 1;
      } else {
        this.stepPos++;
      }
    } else {
      if (this.stepPos === 0) {
        this.stepPos = 0;
    } else {
      this.stepPos--;
    }
    }
  }
}
