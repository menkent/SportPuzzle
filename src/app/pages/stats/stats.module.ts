import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { MainStatsComponent } from './main-stats/main-stats.component';

@NgModule({
  declarations: [MainStatsComponent],
  imports: [
    CommonModule,
    StatsRoutingModule
  ],
  exports: [MainStatsComponent]
})
export class StatsModule { }
