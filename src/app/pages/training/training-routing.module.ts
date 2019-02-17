import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramsComplexComponent } from './programs-complex/programs-complex.component';
import { TrainigComponent } from './trainig/trainig.component';

const routes: Routes = [
  {
    path: '',
    component: ProgramsComplexComponent
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
