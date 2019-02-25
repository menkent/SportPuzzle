import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatButtonToggleModule, MatDividerModule, MatIconModule, MatToolbarModule, MatExpansionModule, MatListModule, MatInputModule } from '@angular/material';
import { ExerciseEditComponent } from './exercise-edit/exercise-edit.component';

@NgModule({
  declarations: [SettingsComponent, ExerciseEditComponent],
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
  ],
  exports: [SettingsComponent, ExerciseEditComponent]
})
export class SettingsModule { }
