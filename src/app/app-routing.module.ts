import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from './sport-common/authorization.guard';
import { AuthorizationComponent } from './sport-common/authorization/authorization.component';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('../app/pages/training/training.module').then(m => m.TrainingModule),
    canActivate: [AuthorizationGuard], 
  },
  {
    path: "settings",
    loadChildren: () => import('../app/pages/settings/settings.module').then(m => m.SettingsModule),
    canActivate: [AuthorizationGuard], 
  },
  {
    path: "stats",
    loadChildren: () => import('../app/pages/stats/stats.module').then(m => m.StatsModule),
    canActivate: [AuthorizationGuard], 
  },
  {
    path: 'login',
    component: AuthorizationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
