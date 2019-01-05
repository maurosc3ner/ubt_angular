import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-annotation-content',
  templateUrl: './annotation.content.component.html',
  styleUrls: ['./annotation.content.component.css']
})
export class AnnotationContentComponent implements OnChanges {
  @Input() current_data = null;
  @Input() EEG_Status_eeg;
  @Input() Command_eeg;

  annotations;

  ngOnChanges() {
    if (this.current_data == null) {
      return 0;
    } else {
      this.annotations = this.current_data['annotations']['items'];
    }
  }
}
