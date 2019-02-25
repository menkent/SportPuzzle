import { Component, OnInit } from '@angular/core';
import { ProgramsService } from '@app/services/programs.service';
import { Router } from '@angular/router';
import { getAllContProtoExercise } from '@app/consts/exercises_conts';
import { ProtoExercise } from '@app/classes/proto-exercise';
import { DialogInfoService } from '@app/sport-common/dialog-info.service';
import { query } from '@angular/animations';

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
    this.router.navigate(['settings/complex', complexId]);
  }

  complexAdd() {
    this.router.navigate(['settings/complex/add']);
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
    this.programService.delProtoExercise(exercise);
    event.stopPropagation();
    this.programService.saveProtoExercises().subscribe();
  }

  viewDescr(exercise: ProtoExercise, event: MouseEvent) {
    this.dialog.openDialog({info: exercise.description, title: exercise.name});
    event.stopPropagation();
  }

}
