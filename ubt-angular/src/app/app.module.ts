import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppTitleBarComponent } from './app.title.bar.component/app.title.bar.component.component';
import { AppPrincipalContentComponent } from './app.principal.content.component/app.principal.content.component.component';
import { AppControlBarComponent } from './app.control.bar.component/app.control.bar.component.component';
import { EegContentComponent } from './app.principal.content.component/eeg-content/eeg-content.component';
import { TopoPlotComponent } from './app.principal.content.component/topo-plot/topo-plot.component';
import { TdContentComponent } from './app.principal.content.component/td-content/td-content.component';
import { TdControlComponent } from './app.principal.content.component/td-control/td-control.component';
import { EdfPositionBarComponent } from './app.control.bar.component/edf-position-bar/edf-position-bar.component';
import { EdfControlBarComponent } from './app.control.bar.component/edf-control-bar/edf-control-bar.component';
import { EdfMenuBarComponent } from './app.control.bar.component/edf-menu-bar/edf-menu-bar.component';
import { EdfControlButtonsComponent } from './app.control.bar.component/edf-control-buttons/edf-control-buttons.component';
import { PlaneViewComponent } from './app.principal.content.component/plane-view/plane-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpModule } from '@angular/http';

import { D3Service } from './app.services/d3/d3.service';

import {
  MatProgressBarModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    AppControlBarComponent,
    AppPrincipalContentComponent,
    AppTitleBarComponent,
    EegContentComponent,
    TopoPlotComponent,
    TdContentComponent,
    TdControlComponent,
    EdfPositionBarComponent,
    EdfControlBarComponent,
    EdfMenuBarComponent,
    EdfControlButtonsComponent,
    PlaneViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatToolbarModule,
    HttpModule
  ],
  providers: [ D3Service ],
  bootstrap: [AppComponent]
})
export class AppModule { }
