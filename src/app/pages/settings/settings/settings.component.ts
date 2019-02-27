import { Component, OnInit } from '@angular/core';
import { ProgramsService } from '@app/services/programs.service';
import { Router } from '@angular/router';
import { getAllContProtoExercise } from '@app/consts/exercises_conts';
import { ProtoExercise } from '@app/classes/proto-exercise';
import { DialogInfoService } from '@app/sport-common/dialog-info.service';
import { query } from '@angular/animations';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  get programComplexes() {
    return this.programService.programComplexes;
  }

  constructor(public programService: ProgramsService, private router: Router, private dialog: DialogInfoService) { }

  ngOnInit() {
    this.programService.loadProtoExercises().subscribe();
  }

  complexClick(complexId) {
    this.router.navigate(['settings/program-complex-edit'], { queryParams: { complexId } });
  }

  complexAdd() {
    this.router.navigate(['settings/program-complex-edit']);
  }

  exerciseClick(exerciseId) {
    if (getAllContProtoExercise().find(ex => ex.id === exerciseId)) {
      return;
    }
    this.router.navigate(['settings/exercise-edit'], { queryParams: { exerciseId } });
  }

  addExercise() {
    this.router.navigate(['settings/exercise-edit']);
  }

  delExercise(exercise: ProtoExercise, event: MouseEvent) {
    event.stopPropagation();
    if (getAllContProtoExercise().find(ex => ex.id === exercise.id)) {
      return;
    }
    this.dialog.openDialog({info: 'Уверены, что хотите удалить упражнение? Оно будет удалено из все тренеровок.', btnOk: true}, (res) => {
      if (res) {
        this.programService.delProtoExercise(exercise);
        this.programService.saveProtoExercises()
        .pipe(mergeMap(() => {
          this.programService.resetCash(true, true);
          return this.programService.loadTrainings();
        }))
        .subscribe();
      }
    });
  }

  viewDescr(exercise: ProtoExercise, event: MouseEvent) {
    this.dialog.openDialog({info: exercise.description, title: exercise.name});
    event.stopPropagation();
  }

}
