import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { ProgramsService } from '@app/services/programs.service';
import { mergeMap, filter } from 'rxjs/operators';
import { Training } from '@app/classes/training';
import { DialogInfoService } from '@app/sport-common/dialog-info.service';
import { MyTry } from '@app/classes/my-try';

@Component({
  selector: 'app-stat-training',
  templateUrl: './stat-training.component.html',
  styleUrls: ['./stat-training.component.scss']
})
export class StatTrainingComponent implements OnInit {

  training: Training = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private programService: ProgramsService,
    private dialogInfo: DialogInfoService) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      mergeMap((params: ParamMap) => this.programService.getTrainingById(params.get('id'))),
    ).subscribe(training => {
      this.training = training;
      if (!training) {
        setTimeout(() => this.dialogInfo.openDialog({info: 'Программа не найдена'}, () => {
          this.router.navigate(['/stats']);
        }));
      }
    });
  }


  getExerciseTryes(exercise) {
    const countExercise = exercise.tryes.length;
    const exercises = exercise.tryes.map((mtry: MyTry) => `<b>${mtry.weight || 0}</b>/${mtry.repeatCount || 0}`);
    return `${countExercise} [${exercises.join(' - ')}]`;
  }

}
