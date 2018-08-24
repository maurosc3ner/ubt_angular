import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-topo-plot',
  templateUrl: './topo-plot.component.html',
  styleUrls: ['./topo-plot.component.css']
})
export class TopoPlotComponent implements OnInit {
@Input() topoplotImg;

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

  ngAfterContentInit() {
  }

}
