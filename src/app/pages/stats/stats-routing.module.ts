import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainStatsComponent } from './main-stats/main-stats.component';
import { StatTrainigComponent } from './stat-trainig/stat-trainig.component';

const routes: Routes = [
  {
    path: "",
    component: MainStatsComponent,
  },
  {
    path: 'trainig',
    redirectTo: '/stats',
    pathMatch: 'full'
  },
  {
    path: 'trainig/:id',
    component: StatTrainigComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRoutingModule { }
