import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { MainStatsComponent } from './main-stats/main-stats.component';
import { StatTrainingComponent } from './stat-training/stat-training.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatButtonToggleModule, MatDividerModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [MainStatsComponent, StatTrainingComponent],
  imports: [
    CommonModule,
    StatsRoutingModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatIconModule,
  ],
  exports: [MainStatsComponent, StatTrainingComponent]
})
export class StatsModule { }
