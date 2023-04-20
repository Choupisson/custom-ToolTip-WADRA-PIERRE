import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CustomTooltipDirective } from './custom-tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    CustomTooltipDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
