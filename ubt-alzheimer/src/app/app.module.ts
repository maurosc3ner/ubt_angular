import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AppTitleBarComponent } from './app.title.bar.component/app.title.bar.component.component';
import { AppBodyComponent } from './app.body.component/app.body.component';
import { AppFooterComponent } from './app.footer.component/app.footer.component';
import { EegContentComponent } from './app.principal.content.component/eeg-content/eeg-content.component';
import { TopoPlotComponent } from './app.principal.content.component/topo-plot/topo-plot.component';
import { TdContentComponent } from './app.principal.content.component/td-content/td-content.component';
import { TdControlComponent } from './app.principal.content.component/td-control/td-control.component';
import { PlaneViewComponent } from './app.principal.content.component/plane-view/plane-view.component';
import { AnnotationContentComponent } from './app.principal.content.component/annotation.content/annotation.content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { D3Service } from './app.services/d3/d3.service';

import { AlzServices } from './app.services/alzservices';

import { NgIoModule, NgIoConfig } from 'ng-io';
const config: NgIoConfig = { url: 'http://localhost:3300', options: {} };

import {
  MatProgressBarModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule
} from '@angular/material';
import { AlzControlButtonsComponent } from './app.footer.component/alz-control-buttons/alz-control-buttons.component';
import { AlzConnectBarComponent } from './app.footer.component/alz-connect-bar/alz-connect-bar.component';



@NgModule({
  declarations: [
    AppComponent,
    AppBodyComponent,
    AppFooterComponent,
    AppTitleBarComponent,
    EegContentComponent,
    TopoPlotComponent,
    TdContentComponent,
    TdControlComponent,
    PlaneViewComponent,
    AnnotationContentComponent,
    AlzControlButtonsComponent,
    AlzConnectBarComponent
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
    NgIoModule.forRoot(config)
  ],
  providers: [ D3Service, AlzServices ],
  bootstrap: [AppComponent]
})
export class AppModule { }
