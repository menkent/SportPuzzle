import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ExerciseEditComponent } from './exercise-edit/exercise-edit.component';
import { ProgramComplexEditComponent } from './program-complex-edit/program-complex-edit.component';
import { ProtoTrainigEditComponent } from './proto-trainig-edit/proto-trainig-edit.component';

@NgModule({
  declarations: [SettingsComponent, ExerciseEditComponent, ProgramComplexEditComponent, ProtoTrainigEditComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [SettingsComponent, ExerciseEditComponent, ProgramComplexEditComponent]
})
export class SettingsModule { }
