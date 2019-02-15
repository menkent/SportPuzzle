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
  MatStepperModule,
  MatSelectModule,
  MatRippleModule} from '@angular/material';
import { TrainigInfoComponent } from './trainig-info/trainig-info.component';
import { TrainigComponent } from './trainig/trainig.component';
import { FormsModule } from '@angular/forms';
import { MyTryComponent } from './my-try/my-try.component';
import { CardioTryComponent } from './cardio-try/cardio-try.component';
import { MyStretchingComponent } from './my-stretching/my-stretching.component';
import { MyWarmComponent } from './my-warm/my-warm.component';

@NgModule({
  declarations: [ProgramsComplexComponent, TrainigInfoComponent, TrainigComponent, MyTryComponent, CardioTryComponent, MyStretchingComponent, MyWarmComponent],
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
    MatSelectModule,
    MatRippleModule,

    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
  ],
  exports: [ProgramsComplexComponent, TrainigInfoComponent, TrainigComponent, MyTryComponent, CardioTryComponent, MyStretchingComponent, MyWarmComponent]
})
export class TrainingModule { }
