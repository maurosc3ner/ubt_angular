import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';

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
import { AnnotationContentComponent } from './app.principal.content.component/annotation.content/annotation.content.component';
import { FooterComponent } from './app.footer.component/app.footer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { D3Service } from './app.services/d3/d3.service';

import { NgIoModule, NgIoConfig } from 'ng-io';
const config: NgIoConfig = { url: 'http://localhost:3300', options: {} };

import {
  MatProgressBarModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatPaginatorIntl,
  MatCardModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatTabsModule

} from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { AnnotTableComponent } from './app.principal.content.component/annot-table/annot-table.component';
import { MyPaginator } from './app.principal.content.component/annot-table/myPaginatorClass';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { EdfFileDialogComponent } from './app.control.bar.component/edf-menu-bar/edf-file-dialog/edf-file-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WizardComponent } from './app.wizard/app.wizard.component';

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
    PlaneViewComponent,
    AnnotationContentComponent,
    AnnotTableComponent,
    EdfFileDialogComponent,
    FooterComponent,
    WizardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CdkTableModule,
    MatProgressBarModule,
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatSliderModule,
    HttpModule,
    NgIoModule.forRoot(config),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatRadioModule,
    FormsModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    EdfFileDialogComponent
  ],
  providers: [ D3Service,
    { provide: MatPaginatorIntl, useClass: MyPaginator}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
