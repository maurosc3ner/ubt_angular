import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-td-content',
  templateUrl: './td-content.component.html',
  styleUrls: ['./td-content.component.css']
})
export class TdContentComponent implements OnInit {
  @Input() ESIstatus_td: Boolean;
  ngOnInit() {
    this.ESIstatus_td = true;
  }
}
