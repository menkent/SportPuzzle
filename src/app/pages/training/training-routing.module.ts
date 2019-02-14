import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramsComplexComponent } from './programs-complex/programs-complex.component';
import { TrainigInfoComponent } from './trainig-info/trainig-info.component';
import { TrainigComponent } from './trainig/trainig.component';

const routes: Routes = [
  {
    path: '',
    component: ProgramsComplexComponent
  },
  {
    path: 'trainig-info/:id',
    component: TrainigInfoComponent,
  },
  {
    path: 'trainig',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'trainig/:protoid',
    component: TrainigComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
