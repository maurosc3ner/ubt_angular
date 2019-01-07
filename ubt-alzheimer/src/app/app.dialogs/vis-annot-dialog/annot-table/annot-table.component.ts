import { Component, OnInit, ViewChild,  Input, OnChanges } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { AnnotTableDataSource } from './annot-table-datasource';

@Component({
  selector: 'annot-table',
  templateUrl: './annot-table.component.html',
  styleUrls: ['./annot-table.component.css']
})
export class AnnotTableComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: AnnotTableDataSource;
  @Input() current_data = null;
  
  displayedColumns = ['onset', 'description'];

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.current_data == null) {
      return 0;
    } else {
      this.dataSource = new AnnotTableDataSource(this.paginator, this.sort, this.current_data);
      
    }
  }

}
