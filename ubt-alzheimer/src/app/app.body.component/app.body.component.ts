import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-body-component',
  templateUrl: './app.body.component.html',
  styleUrls: ['./app.body.component.css']
})
export class AppBodyComponent implements OnInit, OnChanges {
  @Input() Status: number;
  @Input() Command_Control;
  @Input() current_data_in;
  @Input() localState_in;

  visEEG: boolean;
  visAnno: boolean;
  constructor() {
  }

  ngOnInit() {
    this.visEEG=true;
    this.visAnno=false;
  }

  ngOnChanges() {
    // console.log('abc-ngOnChanges new channels',this.current_data_in,this.localState_in);

    if (this.localState_in==3){
      if(this.visAnno == true){
        this.visAnno = false;
      }else{
        this.visAnno = true;
      }
      // this.visEEG = false;
      
    }


  }
  

}
