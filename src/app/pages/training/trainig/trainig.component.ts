import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProtoTraining } from 'src/app/classes/proto-training';
import { Training } from 'src/app/classes/training';
import { ProgramsService } from 'src/app/services/programs.service';
import { mergeMap, concat, merge, map, filter } from 'rxjs/operators';
import { MatVerticalStepper, MatDialog } from '@angular/material';
import { Exercise } from 'src/app/classes/exercise';
import { ProtoExercise } from 'src/app/classes/proto-exercise';
import { MyTry } from 'src/app/classes/my-try';
import { DialogInfoService } from 'src/app/sport-common/dialog-info.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-trainig',
  templateUrl: './trainig.component.html',
  styleUrls: ['./trainig.component.scss']
})
export class TrainigComponent implements OnInit {

  prevTrainig: Training = null;
  prevExercises: Exercise[] = [];
  protoTrainig: ProtoTraining = null;
  trainig: Training = null;
  lastStepperEvent = null;
  countStepBeforeExercises = 2;

  @ViewChild(MatVerticalStepper) stepper: MatVerticalStepper;

  getTrainigDate() {
    const d = this.trainig.date;
    return d ? new Date(d) : new Date();
  }

  setTrainigDate(event) {
    const time = event.value && event.value.getTime();
    if (time) {
      this.trainig.date = time;
    }
  }

  // todo: Сделать сохранение через поток: то есть вызывает next, а оно вызывает saveTrainig()

  constructor(private route: ActivatedRoute, private router: Router, private programService: ProgramsService, private dialogInfo: DialogInfoService) { }

  private _createNewTrainig() {
    this.trainig = new Training({
      protoTrainig: this.protoTrainig,
      date: new Date().getTime(),
    });
    this.trainig.init();
    this.programService.adjunctionWithID(this.trainig);
    this.programService.addTrainig(this.trainig);
  }

  ngOnInit() {
    // todo: реализвать через merge или forkJoin, чтобы все обсёрваблы сразу выполнились
    this.programService.getProgramComplex().pipe(
      mergeMap(() => this.route.paramMap),
      map((params: ParamMap) => {
        this.protoTrainig = this.programService.getProtoTrainigById(params.get('protoid'));
        return this.protoTrainig;
      }),
      mergeMap(() => {
        if (this.protoTrainig) {
          return this.programService.loadTrainigs();
        } else {
          // 
          this.openDialog({info: 'Программа не найдена. Попробуйте ещё раз!'}, () => {
            this.router.navigate(['']);
          });
          return of(null);
        }
        }),
        filter((el) => !!el),
    ).subscribe((trainigs: Training[]) => {
      // ищем все тренеровки, которые похожи на эту прото тренеровку
      const asProtoTrainigs = trainigs
        .filter((tr: Training) => tr.protoTrainig.id === this.protoTrainig.id)
        .sort((a: Training, b: Training) => b.date - a.date);
      // console.log('asProtoTrainigs::', asProtoTrainigs);
      // ищем незаконченные тренеровки. Если есть незаконченная, то предлагаем её продолжить, иначе создаём новую
      const nowDate = new Date().getTime();
      const hours12ms = 12 * 60 * 60 * 1000;
      // Последняя незавершённая тренировка, не страше 12 часов
      const findLastNotCompleted = asProtoTrainigs.find((tr: Training) => !tr.isCompleted && (nowDate - tr.date < hours12ms));

      // Последняя завершённая тренировка
      this.prevTrainig = asProtoTrainigs.find((tr: Training) => tr.isCompleted);
      this.prevExercises = this.prevTrainig && this.prevTrainig.exercises || [];

      // Если есть последня незавершённая тренировка, то предложить её продолжить
      if (findLastNotCompleted) {
        this.openDialog({
            info: 'Найдена предыдущая незавершённая тренеровка. Продолжить её?',
            btnOk: true
          }, (res) => {
            if (res) {
              this.trainig = findLastNotCompleted;
            } else {
              this._createNewTrainig();
            }
          }
        );
      } else {
        this._createNewTrainig();
      }
    });
  }

  showDebug() {
    console.log(this.protoTrainig);
    console.log(this.trainig);
    console.log(this.prevTrainig);
  }

  openDialog(data, callback?): void {
    this.dialogInfo.openDialog(data, (result) => {
      if (callback) {
        callback(result);
      }
    });
  }

  changeSelection(event) {
    // console.log('changeSelection', event);
    this.lastStepperEvent = event;
    const countStepBeforeExercises = this.countStepBeforeExercises;
    const selectedIndex = event.selectedIndex;
    const exerciseIndex = selectedIndex - countStepBeforeExercises;
    if (exerciseIndex >= 0 && exerciseIndex < this.protoTrainig.exercises.length) {
      const protoExercise = this.protoTrainig.exercises[exerciseIndex];

      let exercise = this.trainig.getExercise(protoExercise);
      if (!exercise) {
        exercise = new Exercise({
          protoLink: protoExercise
        });
        this.trainig.exercises.push(exercise);
      }
      if (!exercise.tryes.length) {
        this.addNewTry(exercise);
      }
    }

    // Обработка предыдущего поля: удаление не заполненных траев
    const previouslySelectedIndex = event.previouslySelectedIndex - countStepBeforeExercises;
    if (previouslySelectedIndex >= 0 && previouslySelectedIndex < this.protoTrainig.exercises.length) {
      const exercise = this.trainig.getExercise(this.protoTrainig.exercises[previouslySelectedIndex]);
      if (exercise) {
        const filtered = exercise.tryes.filter((el: MyTry) => !el.isEmpty());
        exercise.tryes = filtered;
        exercise.tryes.forEach((el: MyTry, index: number) => el.index = index);
      }
    }

    // Сохраняем текущую тренеровку: 
    this.programService.saveTrainig().subscribe();
  }

  getTryesByProtoExercise(protoExercise: ProtoExercise) {
    const exercise = this.trainig.getExercise(protoExercise);
    return exercise && exercise.tryes || [];
  }

  getExerciseByProtoExercise(protoExercise: ProtoExercise) {
    return this.trainig.getExercise(protoExercise);
  }

  addNewTry(exercise: Exercise) {
    if (!exercise) {
      return;
    }
    const nTry = new MyTry();
    nTry.index = exercise.tryes.length;
    exercise.tryes.push(nTry);
  }

  openHelpDialogExercise(protoExercise: ProtoExercise, event: MouseEvent) {
      console.log('openHelpDialogExercise::', event);
      event.stopPropagation();
      this.openDialog({info: protoExercise.description, title: protoExercise.name});
  }

  openVideoLinkExercise(protoExercise: ProtoExercise, event: MouseEvent) {
    console.log('openVideoLinkExercise::', protoExercise.videoLink);
    event.stopPropagation();
    window.open(protoExercise.videoLink, '_blank');
  }

  private _closeTrainig() {
    console.log('Close Trainig');
    this.trainig.isCompleted = true;
    this.programService.saveTrainig().subscribe();
    this.router.navigate(['/']);
  }

  trySave() {
    // todo: Проверить, всё ли заполнено, если да, то сохранить и перейти назад в навигаторе
    this.showDebug();
    this.programService.saveTrainig().subscribe();
    // console.log('trySave::', this.trainig, this.trainig.canComplete);
    if (!this.trainig.canComplete) {
      this.openDialog({
          info: 'Не все упрежнения выполнены. Завершить тренеровку?',
          btnOk: true
        }, (res) => {
          if (res) {
            this._closeTrainig();
          }
      });
    } else {
      this._closeTrainig();
    }

  }

  getPrevExercise(protoExercise) {
    const lastExercise = this.prevExercises.find((ex: Exercise) => ex.protoLink.id === protoExercise.id);
    if (!lastExercise || !lastExercise.haveNotEmprtyTryes()) {
      return '';
    }
    const countExercise = lastExercise.tryes.length;
    const exercises = lastExercise.tryes.map((mtry: MyTry) => `<b>${mtry.weight || 0}</b>/${mtry.repeatCount || 0}`);
    return `${countExercise} [${exercises.join(' - ')}]`;
  }


  userPrevTrainingExercise(protoExercise: ProtoExercise) {
    const exercise = this.trainig.getExercise(protoExercise);
    const lastExercise = this.prevExercises.find((ex: Exercise) => ex.protoLink.id === protoExercise.id);
    if (!exercise || !lastExercise || !lastExercise.haveNotEmprtyTryes()) {
      return '';
    }
    exercise.tryes = [];
    lastExercise.tryes.map((tr: MyTry) => {
      const nTry = new MyTry(tr.toMap());
      // nTry.index = exercise.tryes.length;
      exercise.tryes.push(nTry);
    });
  }

}
