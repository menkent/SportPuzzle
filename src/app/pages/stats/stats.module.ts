import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { MainStatsComponent } from './main-stats/main-stats.component';
import { StatTrainigComponent } from './stat-trainig/stat-trainig.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatButtonToggleModule, MatDividerModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [MainStatsComponent, StatTrainigComponent],
  imports: [
    CommonModule,
    StatsRoutingModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatIconModule,
  ],
  exports: [MainStatsComponent, StatTrainigComponent]
})
export class StatsModule { }
