import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainStatsComponent } from './main-stats/main-stats.component';
import { StatTrainingComponent } from './stat-training/stat-training.component';

const routes: Routes = [
  {
    path: "",
    component: MainStatsComponent,
  },
  {
    path: 'training',
    redirectTo: '/stats',
    pathMatch: 'full'
  },
  {
    path: 'training/:id',
    component: StatTrainingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRoutingModule { }
