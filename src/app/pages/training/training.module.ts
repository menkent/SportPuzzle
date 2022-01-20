import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { ProgramsComplexComponent } from './programs-complex/programs-complex.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { TrainingComponent } from './training/training.component';
import { FormsModule } from '@angular/forms';
import { MyTryComponent } from './my-try/my-try.component';
import { CardioTryComponent } from './cardio-try/cardio-try.component';
import { MyStretchingComponent } from './my-stretching/my-stretching.component';
import { MyWarmComponent } from './my-warm/my-warm.component';
import { SportCommonModule } from 'src/app/sport-common/sport-common.module';

@NgModule({
  declarations: [ProgramsComplexComponent, TrainingComponent, MyTryComponent, CardioTryComponent, MyStretchingComponent, MyWarmComponent],
  imports: [
    CommonModule,
    TrainingRoutingModule,

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
    MatMenuModule,
    MatNativeDateModule,

    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
  ],
  exports: [ProgramsComplexComponent, TrainingComponent, MyTryComponent, CardioTryComponent, MyStretchingComponent, MyWarmComponent]
})
export class TrainingModule { }
