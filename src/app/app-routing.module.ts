import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphTriangleViewComponent } from './views/triangle/graph-triangle.view';
import { GraphMultipleViewComponent } from './views/multiple/graph-multiple.view';
import { GraphAnimationViewComponent } from './views/animation/graph-animation.view';


@NgModule({
  exports: [RouterModule]
})
export class AppRoutingModule { }
