import { Component, OnInit, Input } from '@angular/core';
import { ProtoTraining } from '@app/classes/proto-training';
import { ProtoExercise } from '@app/classes/proto-exercise';

@Component({
  selector: 'app-proto-trainig-edit',
  templateUrl: './proto-trainig-edit.component.html',
  styleUrls: ['./proto-trainig-edit.component.scss']
})
export class ProtoTrainigEditComponent implements OnInit {

  @Input() namespace: ProtoTraining;

  constructor() { }

  ngOnInit() {
  }

  exerciseAdd() {
    this.namespace.exercises.push(new ProtoExercise());
  }

}
