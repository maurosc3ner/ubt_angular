import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { App } from './app.title.bar.component/app.title.bar.component.component';
import { App } from './app.principal.content.component/app.principal.content.component.component';
import { App } from './app.control.bar.component/app.control.bar.component.component';

@NgModule({
  declarations: [
    AppComponent,
    App.Title.Bar.ComponentComponent,
    App.Principal.Content.ComponentComponent,
    App.Control.Bar.ComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
