import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalconfigComponent } from './global-config.component';

const routes: Routes = [
  { path: '', component: GlobalconfigComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalconfigRoutingModule { }
