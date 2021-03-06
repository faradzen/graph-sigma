import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SigmaGraphComponent } from 'src/app/components/sigma-graph.component';
// import { sigma } from 'sigma';
import { GraphAnimationViewComponent } from './views/animation/graph-animation.view';
import { GraphMultipleViewComponent } from './views/multiple/graph-multiple.view';
import { GraphTriangleViewComponent } from './views/triangle/graph-triangle.view';
import { RouterModule, Routes } from '@angular/router';
import { FreestyleRendererViewComponent } from './views/freestyle-renderer/freestyle-renderer.view';


const routes: Routes = [
  { path: 'triangle', component: GraphTriangleViewComponent },
  { path: 'multiple', component: GraphMultipleViewComponent },
  { path: 'animation', component: GraphAnimationViewComponent },
  { path: 'free', component: FreestyleRendererViewComponent }
];


@NgModule({
  declarations: [
    AppComponent, SigmaGraphComponent,

    GraphAnimationViewComponent, GraphMultipleViewComponent, GraphTriangleViewComponent, FreestyleRendererViewComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('init sigma');
  }
}
