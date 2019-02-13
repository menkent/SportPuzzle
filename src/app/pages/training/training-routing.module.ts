import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramsComplexComponent } from './programs-complex/programs-complex.component';
import { ComplexInfoComponent } from './complex-info/complex-info.component';
import { TrainigInfoComponent } from './trainig-info/trainig-info.component';
import { TrainigComponent } from './trainig/trainig.component';

const routes: Routes = [
  {
    path: "",
    component: ProgramsComplexComponent
  },
  {
    path: "complex-info",
    component: ComplexInfoComponent,
  },
  {
    path: "trainig-info/:id",
    component: TrainigInfoComponent,
  },
  {
    path: "trainig",
    component: TrainigComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
