import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import * as c3 from 'c3';
import { rgb } from '../../../../node_modules/@types/d3';

@Component({
  selector: 'app-alz-eeg-c3',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './alz-eeg-c3.component.html', 
  //styleUrls: ['./alz-eeg-c3.component.css'],
  styles: [`
     .line {
       fill: red;
    }

    .inverted .c3 c3-chart-arcs-background {
      background-color: #4F5E63;
    }
    .inverted text.c3-text { 
      fill: whitesmoke!important;
      stroke: whitesmoke!important;
      stroke-opacity: 0.5!important;
    }

  `]
  
})
export class AlzEegC3Component implements OnInit {
  @Input() EEG_Status_eeg;
  @Input() current_data = null;
  chartPLETH;
  chartENT100;
  chartENTROPYRE;
  dataPLETH=[];
  dataENT100=[];
  dataENTROPYRE=[]
  dataPLETH_x;
  fdPLETH: boolean;
  fdENT100: boolean;
  fdENTROPYRE: boolean;
  constructor() { }

  ngOnInit() {
    //PLETH
    this.fdPLETH=false;
    this.dataPLETH = ['PLETH', 0,0,0,0,0];
    this.chartPLETH = c3.generate({
      bindto: '#chartPLETH',
      data: {
        columns: [
          this.dataPLETH
        ],
        type: 'spline'
      },
      
      color: {
        pattern: ['#1f77b4']
      },
      axis: {
        y: {
            max: 5,
            min: -5
        }
      }
    });
    //ENT_100
    this.fdENT100=false;
    this.dataENT100 = ['ENT100', 0,0,0,0,0];
    this.chartENT100 = c3.generate({
      bindto: '#chartENT100',
      data: {
        columns: [
          this.dataENT100
        ],
        type: 'spline'
      },
      
      color: {
        pattern: ['#0000ff']
      },
      axis: {
        y: {
            max: 100,
            min: -100
        }
      }
    });
    //ENTROPY_RE
    this.fdENTROPYRE=false;
    this.dataENTROPYRE = ['ENTROPY_RE', 0,0,0,0,0];
    this.chartENTROPYRE = c3.generate({
      bindto: '#chartENTROPYRE',
      data: {
        columns: [
          this.dataENTROPYRE
        ],
        type: 'spline'
      },
      point: {
        show: false
      }, 
      color: {
        pattern: ['#00ff00']
      },
      axis: {
        
        // stroke: rgb(255,255,255),
        y: {
            max: 100,
            min: -100
        }
      }
    });
    
  

  }

  ngOnChanges() {
    
    // this.current_data["channels"].forEach((currentChannel,index, array)=>{
    //   console.log('EC3-channels traverse',currentChannel,index);
    // });
    if (!this.isEmpty(this.current_data) && this.current_data["debug"]["command"]=="request_channels"){
      //console.log('EC3-ngOnChanges',this.current_data);
      this.current_data["channels"].forEach((currentChannel,index, array)=>{
        console.log('EC3-ngOnChanges',currentChannel["label"]);
        if (currentChannel["label"]=='PLETH'){
          if (this.dataPLETH.length<=300 && this.fdPLETH==false){
            for ( let i = 0; i < currentChannel["data"].length; i += 1 ) {
              this.dataPLETH.push(currentChannel["data"][i]);
            } 
          }else{
            this.dataPLETH=[];
            this.dataPLETH.push('PLETH');
            for ( let i = 0; i < currentChannel["data"].length; i += 1 ) {
              this.dataPLETH.push(currentChannel["data"][i]);
            }
            this.fdPLETH=true;
          } //end esle
          this.chartPLETH.flow({
            columns: [
              this.dataPLETH
            ],
            duration: 250,
            length: currentChannel["data"].length
          });
        } //end fi PLETH
        else if (currentChannel["label"]=='ENT_100'){
          if (this.dataENT100.length<=500 && this.fdPLETH==false){
            for ( let i = 0; i < 100; i += 1 ) {
              this.dataENT100.push(currentChannel["data"][i]);
            } 
          }else{
            this.dataENT100=[];
            this.dataENT100.push('ENT100');
            for ( let i = 0; i < 100; i += 1 ) {
              this.dataENT100.push(currentChannel["data"][i]);
            }
            this.fdENT100=true;
          } //end esle
          this.chartENT100.flow({
            columns: [
              this.dataENT100
            ],
            duration: 250,
            length: 100
          });
        } //end fi ENT100
        else if (currentChannel["label"]=='ENTROPY RE'){
          if (this.dataENTROPYRE.length<=5 && this.fdPLETH==false){
            for ( let i = 0; i < currentChannel["data"].length; i += 1 ) {
              this.dataENTROPYRE.push(currentChannel["data"][i]);
            } 
          }else{
            this.dataENTROPYRE=[];
            this.dataENTROPYRE.push('ENTROPY_RE');
            for ( let i = 0; i < currentChannel["data"].length; i += 1 ) {
              this.dataENTROPYRE.push(currentChannel["data"][i]);
            }
            this.fdENTROPYRE=true;
          } //end esle
          this.chartENTROPYRE.flow({
            columns: [
              this.dataENTROPYRE
            ],
            duration: 250,
            length: currentChannel["data"].length
          });
        } //end fi ENTROPY RE


      });

    }

    
  }

  ngAfterViewInit() {
    
  }

  onAddClick(event){
    

// console.log('EC3-onAddClick',this.dataPLETH,this.dataPLETH.length);
    if (this.dataPLETH.length<=12 && this.fdPLETH==false){
      this.dataPLETH.push(this.getRndInteger(1,10));
      this.dataPLETH.push(this.getRndInteger(1,10));
      this.dataENT100.push(this.getRndInteger(1,10));
      this.dataENT100.push(this.getRndInteger(1,10));
      this.dataENTROPYRE.push(this.getRndInteger(1,10));
      this.dataENTROPYRE.push(this.getRndInteger(1,10));
    }else{
      this.dataPLETH=['PLETH' ,this.getRndInteger(1,10),this.getRndInteger(1,10)];
      this.fdPLETH=true;
      this.dataENT100=['ENT100' ,this.getRndInteger(1,10),this.getRndInteger(1,10)];
      this.fdENT100=true;
      this.dataENTROPYRE=['ENTROPY_RE' ,this.getRndInteger(-100,100),this.getRndInteger(-100,100)];
      this.fdENTROPYRE=true;
    }
      console.log('EC3-onAddClick',this.dataPLETH,this.dataPLETH.length);
      this.chartPLETH.flow({
        columns: [
          this.dataPLETH
        ],
        duration: 0,
        length:2
      });

      this.chartENT100.flow({
        columns: [
          this.dataENT100
        ],
        duration: 0,
        length:2
      });
      this.chartENTROPYRE.flow({
        columns: [
          this.dataENTROPYRE
        ],
        duration: 0,
        length:2
      });
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  } 

  isEmpty(obj) {
    return Object.keys(obj).every(k => !Object.keys(obj[k]).length)
  }



}
