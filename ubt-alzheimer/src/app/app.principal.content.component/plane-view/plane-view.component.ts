import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-plane-view',
  templateUrl: './plane-view.component.html',
  styleUrls: ['./plane-view.component.css']
})
export class PlaneViewComponent implements OnInit {
  @Input() srcImage: String;

  ngOnInit() {
  }

}
