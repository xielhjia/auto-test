import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemstatusComponent } from './system-status.component';

const routes: Routes = [
  { path: '', component: SystemstatusComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemstatusRoutingModule { }
