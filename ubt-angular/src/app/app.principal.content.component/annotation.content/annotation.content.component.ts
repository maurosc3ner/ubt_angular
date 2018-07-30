import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-annotation-content',
  templateUrl: './annotation.content.component.html',
  styleUrls: ['./annotation.content.component.css']
})
export class AnnotationContentComponent implements OnChanges {
  @Input() current_data;

  annotations;

  ngOnChanges() {
    if (this.current_data == null) {} else {
    this.annotations = JSON.parse(this.current_data)['annotations'];
    }
  }
}
