import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {D3Service } from '../app.services/d3/d3.service';

@Component({
  selector: 'app-footer-component',
  templateUrl: './app.footer.component.html',
  styleUrls: ['./app.footer.component.css']
})
export class AppFooterComponent implements OnChanges{
  @Output() portFromFooter = new EventEmitter();
  @Output() footerBridge = new EventEmitter();
  @Input() toogleBarsInput = 0;  //0 for connect / 1 for buttons
  visConnect: Boolean = true;
  visControls: Boolean = false;

  constructor(private d3Service: D3Service) {
  }

  onPortToFooterBar(event) {
    console.log('afc-onPortToFooterBar',event);
    this.portFromFooter.emit(event);
  }

  onCtrlToComponent(event){
    console.log('afc-onCtrlToComponent',event);
    this.footerBridge.emit(event);
  }

  ngOnChanges() {
    console.log('afc-ngOnChanges nuevo dato',this.toogleBarsInput);
    if ( this.toogleBarsInput == 1){
      this.visConnect = false;
      this.visControls = true;
    }else {
      this.visConnect = true;
      this.visControls = false;
    }
  }
  
}
