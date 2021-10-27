import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/inferences' },
  { path: 'inferences', loadChildren: () => import('./pages/inference/inference.module').then(m => m.InferenceModule) },
  { path: 'applications', loadChildren: () => import('./pages/applications/applications.module').then(m => m.ApplicationsModule) },
  { path: 'systemStatus', loadChildren: () => import('./pages/system-status/system-status.module').then(m => m.ApplicationsModule) },
  { path: 'globalConfig', loadChildren: () => import('./pages/global-config/global-config.module').then(m => m.ApplicationsModule) }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 