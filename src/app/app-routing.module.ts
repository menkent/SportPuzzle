import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: "../app/pages/training/training.module#TrainingModule"
  },
  {
    path: "settings",
    loadChildren: "../app/pages/settings/settings.module#SettingsModule"
  },
  {
    path: "stats",
    loadChildren: "../app/pages/stats/stats.module#StatsModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
