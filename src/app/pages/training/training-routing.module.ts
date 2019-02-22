import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramsComplexComponent } from './programs-complex/programs-complex.component';
import { TrainingComponent } from './training/training.component';

const routes: Routes = [
  {
    path: '',
    component: ProgramsComplexComponent
  },
  {
    path: 'training',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'training/:protoid',
    component: TrainingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
