import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { ProgramsComplexComponent } from './programs-complex/programs-complex.component';
import { MatListModule, MatDividerModule, MatIconModule, MatExpansionModule, MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule,
  MatToolbarModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatStepperModule} from '@angular/material';
import { TrainigInfoComponent } from './trainig-info/trainig-info.component';
import { TrainigComponent } from './trainig/trainig.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProgramsComplexComponent, TrainigInfoComponent, TrainigComponent],
  imports: [
    CommonModule,
    TrainingRoutingModule,

    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatDividerModule,
    MatStepperModule,

    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
  ],
  exports: [ProgramsComplexComponent, TrainigInfoComponent, TrainigComponent]
})
export class TrainingModule { }
