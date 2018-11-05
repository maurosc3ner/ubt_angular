import { Component, OnInit, ViewChild,  Input,Output, EventEmitter, OnChanges } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { AnnotTableDataSource } from './annot-table-datasource';

@Component({
  selector: 'annot-table',
  templateUrl: './annot-table.component.html',
  styleUrls: ['./annot-table.component.css']
})
export class AnnotTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: AnnotTableDataSource;
  @Input() current_data = null;
  @Output() closeFromTable = new EventEmitter();
 

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['onset', 'description'];

  

  ngOnInit() {
    }

  ngOnChanges() {
    if (this.current_data == null) {
      return 0;
    } else {
      this.dataSource = new AnnotTableDataSource(this.paginator, this.sort,this.current_data['annotations']["items"]);

      // this.annotations = this.current_data['annotations']['items'];
    }
  }

  onClose() {
    console.log('cerrar topoplot');
    this.closeFromTable.emit(0);
  }
  

}