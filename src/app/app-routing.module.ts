import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './pages/settings/settings/settings.component';
import { MainStatsComponent } from './pages/stats/main-stats/main-stats.component';
import { ProgramsComplexComponent } from './pages/training/programs-complex/programs-complex.component';
import { AuthorizationGuard } from './sport-common/authorization.guard';
import { AuthorizationComponent } from './sport-common/authorization/authorization.component';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('../app/pages/training/training.module').then(m => m.TrainingModule),
    // component: ProgramsComplexComponent,
    canActivate: [AuthorizationGuard], 
  },
  {
    path: "settings",
    loadChildren: () => import('../app/pages/settings/settings.module').then(m => m.SettingsModule),
    // component: SettingsComponent,
    canActivate: [AuthorizationGuard], 
  },
  {
    path: "stats",
    loadChildren: () => import('../app/pages/stats/stats.module').then(m => m.StatsModule),
    // component: MainStatsComponent,
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
