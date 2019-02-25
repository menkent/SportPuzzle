import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProtoExercise } from '@app/classes/proto-exercise';
import { ProgramsService } from '@app/services/programs.service';
import { DialogInfoService } from '@app/sport-common/dialog-info.service';
import { combineLatest, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.component.html',
  styleUrls: ['./exercise-edit.component.scss']
})
export class ExerciseEditComponent implements OnInit {

  exercise: ProtoExercise = null;
  @ViewChild(NgForm) f;
  public canSave = false;

  constructor(
    private route: ActivatedRoute,
    private programService: ProgramsService,
    private dialog: DialogInfoService,
    private router: Router,
    ) { }

  ngOnInit() {
      this.route.queryParamMap.pipe(
        switchMap(params => {
          const exerciseId = params.get('exerciseId');
          if (exerciseId) {
            return this.programService.getProtoExerciseById(exerciseId);
          } else {
            return of(null);
          }
        })
      ).subscribe((prEx: ProtoExercise) => {
        this.exercise = prEx || new ProtoExercise({id: this.programService.generateId()});
      });

  }

  trySave() {
    if (this.f.valid) {
      this.programService.addProtoExercise(this.exercise);
      this.programService.saveProtoExercises().subscribe();
      this.router.navigate(['/settings']);
    } else {
      this.dialog.openDialog({info: 'Заполните Имя упражнения.'});
    }
  }
}
