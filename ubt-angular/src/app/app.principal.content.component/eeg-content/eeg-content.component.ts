import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-eeg-content',
  templateUrl: './eeg-content.component.html',
  styleUrls: ['./eeg-content.component.css']
})
export class EegContentComponent {
  @Input() EEG_Status: Boolean;
}
