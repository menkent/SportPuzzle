import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProtoTraining } from '@app/classes/proto-training';
import { ProtoExercise } from '@app/classes/proto-exercise';
import { ProgramsService } from '@app/services/programs.service';
import { DialogInfoService } from '@app/sport-common/dialog-info.service';

@Component({
  selector: 'app-proto-trainig-edit',
  templateUrl: './proto-trainig-edit.component.html',
  styleUrls: ['./proto-trainig-edit.component.scss']
})
export class ProtoTrainigEditComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private _namespace: ProtoTraining;
  get namespace(): ProtoTraining {
    return this._namespace;
  }
  @Input() set namespace(value: ProtoTraining) {
    this._namespace = value;
    if (!value.exercises.length) {
      this.exerciseAdd();
    }
  }

  protoExercises: ProtoExercise[] = [];
  @Output() deleteTraining: EventEmitter<any> = new EventEmitter();
  @Output() updateTraining: EventEmitter<any> = new EventEmitter();

  constructor(private programServise: ProgramsService, private dialog: DialogInfoService) { }

  ngOnInit() {
    this.programServise.loadProtoExercises().subscribe(res => this.protoExercises = res);
  }

  exerciseAdd() {
    this.namespace.exercises.push(new ProtoExercise());
  }

  exerciseDel(index) {
    if (this.namespace.exercises.length > 1) {
      this.namespace.exercises.splice(index, 1);
    } else {
      this.dialog.openDialog({info: 'Нельзя удалять последнее упражнение из тренировки'});
    }
  }

  selectionChange({value}, index) {
    this.getExerciseById(value).subscribe(res => {
      this.namespace.exercises[index] = new ProtoExercise(res.toMap());
      this.updateTraining.emit(this.namespace);
    });
  }

  getExerciseById(id: string) {
    return this.programServise.getProtoExerciseById(id);
  }

  deleteTrainig(event) {
    event.stopPropagation();
    this.dialog.openDialog({info: 'Уверены, что хотите удалить тренировку?', btnOk: true}, (res) => {
      if (res) {
        this.deleteTraining.emit(this.namespace);
      }
    });
  }

}
