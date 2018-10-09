import { Component, OnInit, Input } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-alz-eeg-c3',
  templateUrl: './alz-eeg-c3.component.html',
  styleUrls: ['./alz-eeg-c3.component.css']
})
export class AlzEegC3Component implements OnInit {
  @Input() EEG_Status_eeg;
  @Input() current_data = null;
  chart;
  data1=[];
  data1_x;
  firstDraw: boolean;
  constructor() { }

  ngOnInit() {
    

    this.firstDraw=false;
    this.data1 = ['PLETH', 0,0,0,0,0];
    this.chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          this.data1
        ],
        type: 'spline'
      },
      
      color: {
        pattern: ['#ffffff']
      },
      axis: {
        y: {
            max: 5,
            min: -5
        }
      }
    });
    
    
  

  }

  ngOnChanges() {
    console.log('EC3-ngOnChanges',this.data1.length);
    if (this.current_data['channels'][0]["label"]=='PLETH'){
      if (this.data1.length<=500 && this.firstDraw==false){
        for ( let i = 0; i < this.current_data['channels'][0]["data"].length; i += 1 ) {
          this.data1.push(this.current_data['channels'][0]["data"][i]);
        }
          
        this.data1.push(this.getRndInteger(1,10));
      }else{
        this.data1=[];
        this.data1.push('PLETH');
        for ( let i = 0; i < this.current_data['channels'][0]["data"].length; i += 1 ) {
          this.data1.push(this.current_data['channels'][0]["data"][i]);
        }
        this.firstDraw=true;
      }

      this.chart.flow({
        columns: [
          this.data1
        ],
        duration: 250,
        length: this.current_data['channels'][0]["data"].length
      });
    }

    
  }

  ngAfterViewInit() {
    
  }

  onAddClick(event){
    

console.log('EC3-onAddClick',this.data1,this.data1.length);
    if (this.data1.length<=12 && this.firstDraw==false){
      this.data1.push(this.getRndInteger(1,10));
      this.data1.push(this.getRndInteger(1,10));
    }else{
      this.data1=['data1' ,this.getRndInteger(1,10),this.getRndInteger(1,10)];
      this.firstDraw=true;
    }

    
      // this.data1.push(this.getRndInteger(1,5));
      // this.data1.push(this.getRndInteger(4,9));
      console.log('EC3-onAddClick',this.data1,this.data1.length);
      // this.chart.flush();

      this.chart.flow({
        columns: [
          this.data1
        ],
        duration: 0,
        length:2
      });
    
    

  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  } 



}
