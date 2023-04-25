import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
// app.module.ts
import { CustomToolTipDirective } from './custom-tooltip.directive';


@NgModule({
  declarations: [
    AppComponent,
    CustomToolTipDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
