// meterlo a assets
// registro en angular.json
// declare en el component
import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { assertPreviousIsParent } from '../../../../node_modules/@angular/core/src/render3/instructions';

@Component({
  selector: 'app-topo-plot',
  templateUrl: './topo-plot.component.html',
  styleUrls: ['./topo-plot.component.css']
})
export class TopoPlotComponent implements OnInit, OnChanges {
  @Input() topoplotImg;
  @Output() closeFromTopoplot = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    const canvas = <HTMLCanvasElement> document.getElementById('myImage');
    canvas['width']  = 640;
    canvas['height'] = 480;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = function() {
     ctx.drawImage(img, 0, 0);
    };
    img.src = this.topoplotImg;
  }

  onClose() {
    console.log('cerrar topoplot');
    this.closeFromTopoplot.emit(0);
  }

}
