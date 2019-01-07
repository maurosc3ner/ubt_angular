import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AppTitleBarComponent } from './app.title.bar.component/app.title.bar.component.component';
import { AppBodyComponent } from './app.body.component/app.body.component';
import { AppFooterComponent } from './app.footer.component/app.footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AlzServices } from './app.services/alzservices';
// const config: NgIoConfig = { url: 'http://localhost:3300', options: {} };
import {
  MatFormFieldModule,
  MatSelectModule, 
  MatInputModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatOptionModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDividerModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatPaginatorIntl} from '@angular/material';
import { AlzControlButtonsComponent } from './app.footer.component/alz-control-buttons/alz-control-buttons.component';
import { AlzConnectBarComponent } from './app.footer.component/alz-connect-bar/alz-connect-bar.component';
import { EegContentComponent } from './app.body.component/eeg-content/eeg-content.component';
import { AnnotationContentComponent } from './app.body.component/annotation.content/annotation.content.component';
import { AlzEegC3Component } from './app.body.component/alz-eeg-c3/alz-eeg-c3.component';
import { AnnotDialogComponent } from './app.dialogs/annot-dialog/annot-dialog.component';
import { PatientDialogComponent } from './app.dialogs/patient-dialog/patient-dialog.component';
import {VisAnnotDialogComponent} from './app.dialogs/vis-annot-dialog/vis-annot-dialog.component';
import { AnnotTableComponent } from './app.dialogs/vis-annot-dialog/annot-table/annot-table.component';
import {MyPaginator} from './app.dialogs/vis-annot-dialog/annot-table/myPaginatorClass';

import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    AppComponent,
    AppBodyComponent,
    AppFooterComponent,
    AppTitleBarComponent,
    AlzControlButtonsComponent,
    AlzConnectBarComponent,
    EegContentComponent,
    AnnotationContentComponent,
    AlzEegC3Component,
    AnnotDialogComponent,
    PatientDialogComponent,
    VisAnnotDialogComponent,
    AnnotTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    HttpModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  entryComponents: [
    AnnotDialogComponent,
    PatientDialogComponent,
    VisAnnotDialogComponent
  ],
  providers: [AlzServices,
    { provide: MatPaginatorIntl, useClass: MyPaginator}],
  bootstrap: [AppComponent]
})
export class AppModule { }
