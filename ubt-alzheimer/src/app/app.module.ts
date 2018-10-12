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
  MatProgressBarModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDialogModule,
  MatDividerModule} from '@angular/material';
import { AlzControlButtonsComponent } from './app.footer.component/alz-control-buttons/alz-control-buttons.component';
import { AlzConnectBarComponent } from './app.footer.component/alz-connect-bar/alz-connect-bar.component';
import { EegContentComponent } from './app.body.component/eeg-content/eeg-content.component';
import { AnnotationContentComponent } from './app.body.component/annotation.content/annotation.content.component';
import { AlzEegC3Component } from './app.body.component/alz-eeg-c3/alz-eeg-c3.component';
import { AnnotDialogComponent } from './app.footer.component/alz-control-buttons/annot-dialog/annot-dialog.component';



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
    AnnotDialogComponent
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
    MatSelectModule,
    HttpModule,
    MatDialogModule,
    MatDividerModule
  ],
  entryComponents: [
    AnnotDialogComponent
  ],
  providers: [AlzServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
