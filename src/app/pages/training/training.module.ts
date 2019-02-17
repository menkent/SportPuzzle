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
  MatRippleModule,
  MatDialogModule} from '@angular/material';
import { TrainigComponent } from './trainig/trainig.component';
import { FormsModule } from '@angular/forms';
import { MyTryComponent } from './my-try/my-try.component';
import { CardioTryComponent } from './cardio-try/cardio-try.component';
import { MyStretchingComponent } from './my-stretching/my-stretching.component';
import { MyWarmComponent } from './my-warm/my-warm.component';
import { SportCommonModule } from 'src/app/sport-common/sport-common.module';

@NgModule({
  declarations: [ProgramsComplexComponent, TrainigComponent, MyTryComponent, CardioTryComponent, MyStretchingComponent, MyWarmComponent],
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
    SportCommonModule,

    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
  ],
  exports: [ProgramsComplexComponent, TrainigComponent, MyTryComponent, CardioTryComponent, MyStretchingComponent, MyWarmComponent]
})
export class TrainingModule { }
