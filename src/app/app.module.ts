import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SigmaGraphComponent } from 'src/app/components/sigma-graph.component';
import { sigma } from 'sigma';
@NgModule({
  declarations: [
    AppComponent, SigmaGraphComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('init sigma');
  }
}
