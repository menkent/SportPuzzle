import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProtoTraining } from 'src/app/classes/proto-training';
import { Training } from 'src/app/classes/training';
import { ProgramsService } from 'src/app/services/programs.service';
import { mergeMap } from 'rxjs/operators';
import { MatVerticalStepper } from '@angular/material';
import { Exercise } from 'src/app/classes/exercise';
import { ProtoExercise } from 'src/app/classes/proto-exercise';
import { MyTry } from 'src/app/classes/my-try';

@Component({
  selector: 'app-trainig',
  templateUrl: './trainig.component.html',
  styleUrls: ['./trainig.component.scss']
})
export class TrainigComponent implements OnInit {

  protoTrainig: ProtoTraining = null;
  trainig: Training = null;

  @ViewChild(MatVerticalStepper) stepper: MatVerticalStepper;

  constructor(private route: ActivatedRoute, private programService: ProgramsService) { }

  ngOnInit() {

    this.programService.getProgramComplex().pipe(
      mergeMap(() => this.route.paramMap),
    ).subscribe((params: ParamMap) => {
      this.protoTrainig = this.programService.getProtoTrainigById(params.get('protoid'));

      console.log('========', this.protoTrainig);
      // Пока всегда создаём новую программу, позже научиться загружать из локалстоража
      // То есть мы ищем НЕ ЗАВЕРШЕННУЮ тренеровку в локал-стораже, если она там есть, то показываем её
      // Если же дата отличается более чем на 5-6 часов, то предупреждаем, что загружена совсем старая тренеровка, предлагаем начать новую (закрыв старую!!)

      this.trainig = new Training({
        protoTrainig: this.protoTrainig,
        date: new Date(),
      });
      this.trainig.init();
    });
  }


  showDebug() {
    console.log(this.protoTrainig);
    console.log(this.trainig);
  }

  changeSelection(event) {
    console.log('changeSelection', event);
    const countStepBeforeExercises = 2;
    const selectedIndex = event.selectedIndex;
    const exerciseIndex = selectedIndex - countStepBeforeExercises;
    if (exerciseIndex >= 0 && selectedIndex < this.protoTrainig.exercises.length + countStepBeforeExercises) {
      const protoExercise = this.protoTrainig.exercises[exerciseIndex];

      let exercise = this.trainig.getExercise(protoExercise);
      if (!exercise) {
        exercise = new Exercise({
          protoLink: protoExercise
        });
        this.trainig.exercises.push(exercise);
      }
      if (!exercise.tryes.length) {
        this.addNewTry(protoExercise);
      }
    }

    // Обработка предыдущего поля: удаление не заполненных траев
    const previouslySelectedIndex = event.previouslySelectedIndex - countStepBeforeExercises;
    if (previouslySelectedIndex >= 0 && previouslySelectedIndex < this.protoTrainig.exercises.length + countStepBeforeExercises) {
      const exercise = this.trainig.getExercise(this.protoTrainig.exercises[previouslySelectedIndex]);
      if (exercise) {
        const filtered = exercise.tryes.filter((el: MyTry) => !el.isEmpty());
        exercise.tryes = filtered;
        exercise.tryes.forEach((el: MyTry, index: number) => el.index = index);
      }
    }
  }

  getTryesByProtoExercise(protoExercise: ProtoExercise) {
    const exercise = this.trainig.getExercise(protoExercise);
    return exercise && exercise.tryes || [];
  }

  getExerciseByProtoExercise(protoExercise: ProtoExercise) {
    return this.trainig.getExercise(protoExercise);
  }

  addNewTry(protoExercise: ProtoExercise) {
    // console.log('addNewTry::', protoExercise);
    const exercise = this.trainig.getExercise(protoExercise);
    if (!exercise) {
      return;
    }
    
    const nTry = new MyTry();
    nTry.index = exercise.tryes.length;
    exercise.tryes.push(nTry);
  }

  openHelpDialogExercise(protoExercise: ProtoExercise) {
      console.log('openHelpDialogExercise::', protoExercise.description);
  }

  openVideoLinkExercise(protoExercise: ProtoExercise) {
    console.log('openVideoLinkExercise::', protoExercise.videoLink);
  }

  trySave() {
    // todo: Проверить, всё ли заполнено, если да, то сохранить и перейти назад в навигаторе
    console.log('trySave::', this.trainig, this.trainig.canComplete);

  }

}
