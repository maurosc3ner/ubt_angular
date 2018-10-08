import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-eeg-content',
  templateUrl: './eeg-content.component.html',
  styleUrls: ['./eeg-content.component.css']
})
export class EegContentComponent implements OnChanges {
    
    @Input() EEG_Status_eeg;
  
    

    ngOnInit() {
        
       
    }
    

    ngOnChanges() {
        console.log('ECC-ngOnChanges',this.EEG_Status_eeg);
    }
     
    
}
