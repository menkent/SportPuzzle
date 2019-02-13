import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainStatsComponent } from './main-stats/main-stats.component';

const routes: Routes = [
  {
    path: "",
    component: MainStatsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRoutingModule { }
