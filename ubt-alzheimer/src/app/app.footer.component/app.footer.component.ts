import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';


@Component({
  selector: 'app-footer-component',
  templateUrl: './app.footer.component.html',
  styleUrls: ['./app.footer.component.css']
})
export class AppFooterComponent implements OnChanges{
  @Output() portFromFooter = new EventEmitter();
  @Output() footerBridge = new EventEmitter();
  @Input() toogleBarsInput = 0;  //0 for connect / 1 for buttons
  @Input() current_debug_bridge;
  visConnect: Boolean = true;
  visControls: Boolean = false;

  constructor() {
  }

  onPortToFooterBar(event) {
    //console.log('afc-onPortToFooterBar',event); probado y OK
    this.portFromFooter.emit(event);
  }

  onCtrlToComponent(event){
    //console.log('afc-onCtrlToComponent',event); probado y OK
    this.footerBridge.emit(event);
  }

  onAnnoComponent(event){
    console.log('afc-onAnnoComponent',event);
    //this.footerBridge.emit(event);
  }

  ngOnChanges() {
    //console.log('afc-ngOnChanges nuevo dato',this.toogleBarsInput);
    if ( this.toogleBarsInput == 1 || this.toogleBarsInput == 2 || this.toogleBarsInput == 3){
      this.visConnect = false;
      this.visControls = true;
    }else if ( this.toogleBarsInput == 0) {
      this.visConnect = true;
      this.visControls = false;
    }
  }
  
}
