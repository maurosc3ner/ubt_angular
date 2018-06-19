import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppTitleBarComponent } from './app.title.bar.component/app.title.bar.component.component';
import { AppPrincipalContentComponent } from './app.principal.content.component/app.principal.content.component.component';
import { AppControlBarComponent } from './app.control.bar.component/app.control.bar.component.component';

@NgModule({
  declarations: [
    AppComponent,
    AppControlBarComponent,
    AppPrincipalContentComponent,
    AppTitleBarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
