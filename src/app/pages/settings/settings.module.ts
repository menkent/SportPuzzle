import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatButtonToggleModule, MatDividerModule, MatIconModule, MatToolbarModule, MatExpansionModule, MatListModule } from '@angular/material';

@NgModule({
  declarations: [SettingsComponent],
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
  ],
  exports: [SettingsComponent]
})
export class SettingsModule { }
