import { Component, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import {EdfFileDialogComponent} from './edf-file-dialog/edf-file-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { D3Service } from '../../app.services/d3/d3.service';
import {last, tap, take, finalize} from 'rxjs/operators';

@Component({
  selector: 'app-edf-menu-bar',
  templateUrl: './edf-menu-bar.component.html',
  styleUrls: ['./edf-menu-bar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EdfMenuBarComponent {
  @Output() esiclick = new EventEmitter();
  @Output() planeclick = new EventEmitter();
  @Output() annoclick = new EventEmitter();
  @Output() clearclick = new EventEmitter();
  @Output() notchfilterclick = new EventEmitter();
  @Output() ocularfilterclick = new EventEmitter();
  @Output() topoclick = new EventEmitter();
  @Output() openclick = new EventEmitter();
  @ViewChild('fileinput') fileinput;

  srcFIles: any;

  constructor(public edfFIleDialog: MatDialog, private myServices: D3Service) { }

  ESILoad(event) {
    this.esiclick.emit(event);
  }
  PlaneLoad(event) {
    this.planeclick.emit(event);
  }
  AnnoLoad(event) {
    this.annoclick.emit(event);
  }
  Clear(event) {
    this.clearclick.emit(event);
  }
  notchFilter(event) {
    this.notchfilterclick.emit(event);
  }
  ocularFilter(event) {
    this.ocularfilterclick.emit(event);
  }
  TopoPlot(event) {
    this.topoclick.emit(event);
  }
  OpenEDF(event) {
    console.log(event['target']['files'][0]['name']);
    this.openclick.emit(event['target']['files'][0]['name']);
  }

  OpenEDFDialog(event) {
    console.log("EC-app-edf-menu-bar", event);

    
    const service = this.myServices.loadPatients();
    service.pipe(
      tap((response) => this.srcFIles = JSON.parse(JSON.stringify(response))),
      take(1),
      finalize(() => {
        console.log('finalized',this.srcFIles);
        let dialogRef=this.edfFIleDialog.open(EdfFileDialogComponent,{
          width: '640px',
          height: '480px',
          data: this.srcFIles
        });
    
        dialogRef.afterClosed().subscribe(result=>{
          console.log(result);
          this.openclick.emit(result.name);
  
        });
    }))
    .subscribe((response: Response) => response);
  }

  SelectFiles(event) {
    event.click();
  }
}
