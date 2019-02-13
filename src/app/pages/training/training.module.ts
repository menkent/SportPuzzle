import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { ProgramsComplexComponent } from './programs-complex/programs-complex.component';
import { MatListModule, MatDividerModule } from '@angular/material';
import { ComplexInfoComponent } from './complex-info/complex-info.component';
import { TrainigInfoComponent } from './trainig-info/trainig-info.component';
import { TrainigComponent } from './trainig/trainig.component';

@NgModule({
  declarations: [ProgramsComplexComponent, ComplexInfoComponent, TrainigInfoComponent, TrainigComponent],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    MatListModule,
    MatDividerModule,
  ],
  exports: [ProgramsComplexComponent, ComplexInfoComponent, TrainigInfoComponent, TrainigComponent]
})
export class TrainingModule { }
