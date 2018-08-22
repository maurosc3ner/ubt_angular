import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-topo-plot',
  templateUrl: './topo-plot.component.html',
  styleUrls: ['./topo-plot.component.css']
})
export class TopoPlotComponent implements OnInit {
@Input() topoplotImg;


// ctx: any


  constructor() { }

  ngOnInit() {
  //   canvas = document.createElement 'canvas'
	//   canvas.height = 400
	//   canvas.width = 800  #size it up
	// document.getElementsByTagName('your DOM')[0].appendChild(canvas) #append it into the DOM 

	// App.ctx = App.canvas.getContext("2d") # Store the context 
  }

  ngOnChanges() {
    
    const canvas = <HTMLCanvasElement> document.getElementById('myImage');
    canvas['width']  = 640;
    canvas['height'] = 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(this.topoplotImg, 0, 0);
  }
  ngAfterContentInit() {
    
  }

}
