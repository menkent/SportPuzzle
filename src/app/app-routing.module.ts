import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from './sport-common/authorization.guard';
import { AuthorizationComponent } from './sport-common/authorization/authorization.component';

const routes: Routes = [
  {
    path: "",
    loadChildren: "../app/pages/training/training.module#TrainingModule",
    canActivate: [AuthorizationGuard], 
  },
  {
    path: "settings",
    loadChildren: "../app/pages/settings/settings.module#SettingsModule",
    canActivate: [AuthorizationGuard], 
  },
  {
    path: "stats",
    loadChildren: "../app/pages/stats/stats.module#StatsModule",
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
