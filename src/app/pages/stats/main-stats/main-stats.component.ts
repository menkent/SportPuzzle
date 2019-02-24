import { Component, OnInit } from '@angular/core';
import { ProgramsService } from '@app/services/programs.service';
import { Training } from '@app/classes/training';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DialogInfoService } from '@app/sport-common/dialog-info.service';

@Component({
  selector: 'app-main-stats',
  templateUrl: './main-stats.component.html',
  styleUrls: ['./main-stats.component.scss']
})
export class MainStatsComponent implements OnInit {

  get trainings$(): Observable<Training[]> {
    return this.programService.trainings$;
  }

  constructor(protected programService: ProgramsService, private router: Router, private dialog: DialogInfoService) { }

  ngOnInit() {
    this.programService.loadTrainings().subscribe();
  }

  onClick(tr: Training) {
    this.router.navigate(['stats/training', tr.id]);
  }

  deleteTraining(training: Training) {
    this.dialog.openDialog({info: 'Удалить тренировку?', btnOk: true},
      (res) => {
        if (res) {
          this.programService.delTraining(training);
          this.programService.saveTraining().subscribe();
        }
    });
  }

  editTraining(training: Training) {
    this.router.navigate(['training', training.protoTraining.id], { queryParams: { id: training.id } });
  }
}
