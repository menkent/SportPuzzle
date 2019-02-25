import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProtoTraining } from 'src/app/classes/proto-training';
import { Training } from 'src/app/classes/training';
import { ProgramsService } from 'src/app/services/programs.service';
import { mergeMap, concat, merge, map, filter, tap, combineLatest, zipAll, switchMap } from 'rxjs/operators';
import { MatVerticalStepper, MatDialog } from '@angular/material';
import { Exercise } from 'src/app/classes/exercise';
import { ProtoExercise } from 'src/app/classes/proto-exercise';
import { MyTry } from 'src/app/classes/my-try';
import { DialogInfoService } from 'src/app/sport-common/dialog-info.service';
import { of, forkJoin } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  prevTraining: Training = null;
  prevExercises: Exercise[] = [];
  protoTraining: ProtoTraining = null;
  training: Training = null;
  lastStepperEvent = null;
  countStepBeforeExercises = 2;

  @ViewChild(MatVerticalStepper) stepper: MatVerticalStepper;

  getTrainingDate() {
    const d = this.training.date;
    return d ? new Date(d) : new Date();
  }

  setTrainingDate(event) {
    const time = event.value && event.value.getTime();
    if (time) {
      this.training.date = time;
    }
  }

  // todo: Сделать сохранение через поток: то есть вызывает next, а оно вызывает saveTraining()

  constructor(private route: ActivatedRoute, private router: Router, private programService: ProgramsService, private dialogInfo: DialogInfoService) { }

  private _createNewTraining() {
    this.training = new Training({
      protoTraining: this.protoTraining,
      date: new Date().getTime(),
    });
    this.training.init();
    this.programService.adjunctionWithID(this.training);
    this.programService.addTraining(this.training);
  }

  private _editMode(id: string) {
    return this.programService.getTrainingById(id).pipe(tap((tr: Training) => {
      this.training = tr;
      this.protoTraining = tr.protoTraining;
    }));
  }

  private _currentMode(protoid: string) {
    this.protoTraining = this.programService.getProtoTrainingById(protoid);
    console.log(this.protoTraining);
    return of(null).pipe(
      mergeMap(() => {
        if (this.protoTraining) {
          return this.programService.loadTrainings();
        } else {
          // Найдена старая программа
          this.openDialog({info: 'Программа не найдена. Попробуйте ещё раз!'}, () => {
            this.router.navigate(['']);
          });
          return of(null);
        }
        }),
        filter(e => !!e),
        map((trainings: Training[]) => {
          // ищем все тренеровки, которые похожи на эту прото тренеровку
          const asProtoTrainings = trainings
            .filter((tr: Training) => tr.protoTraining.id === this.protoTraining.id)
            .sort((a: Training, b: Training) => b.date - a.date);
          // console.log('asProtoTrainings::', asProtoTrainings);
          // ищем незаконченные тренеровки. Если есть незаконченная, то предлагаем её продолжить, иначе создаём новую
          const nowDate = new Date().getTime();
          const hours12ms = 12 * 60 * 60 * 1000;
          // Последняя незавершённая тренировка, не страше 12 часов
          const findLastNotCompleted = asProtoTrainings.find((tr: Training) => !tr.isCompleted && (nowDate - tr.date < hours12ms));

          // Последняя завершённая тренировка
          this.prevTraining = asProtoTrainings.find((tr: Training) => tr.isCompleted);
          this.prevExercises = this.prevTraining && this.prevTraining.exercises || [];

          // Если есть последня незавершённая тренировка, то предложить её продолжить
          if (findLastNotCompleted) {
            this.openDialog({
                info: 'Найдена предыдущая незавершённая тренеровка. Продолжить её?',
                btnOk: true
              }, (res) => {
                if (res) {
                  this.training = findLastNotCompleted;
                } else {
                  this._createNewTraining();
                }
              }
            );
          } else {
            this._createNewTraining();
          }
        })
      );
  }

  ngOnInit() {
    // todo: реализвать через merge или forkJoin, чтобы все обсёрваблы сразу выполнились
    of(null).pipe(
      combineLatest(
        this.programService.getProgramComplex(),
        this.route.paramMap,
        this.route.queryParamMap
      ),
      tap((r) => console.warn(r)),
      switchMap((value: any, index) => {
        const params = value[2];
        const queryParamMap = value[3];
        const protoid = params.get('protoid');
        const id = queryParamMap.get('id');

        if (id) {  // значит это попытка редактирования программы
          return this._editMode(id);
        } else if (protoid) { // Попытка создания новой программы или продолжение недавней
          return this._currentMode(protoid);
        } else {
          this.router.navigate(['/']);
          return of(null);
        }
      }),
    ).subscribe();
  }

  showDebug() {
    console.log(this.protoTraining);
    console.log(this.training);
    console.log(this.prevTraining);
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
    if (exerciseIndex >= 0 && exerciseIndex < this.protoTraining.exercises.length) {
      const protoExercise = this.protoTraining.exercises[exerciseIndex];

      let exercise = this.training.getExercise(protoExercise);
      if (!exercise) {
        exercise = new Exercise({
          protoLink: protoExercise
        });
        this.training.exercises.push(exercise);
      }
      if (!exercise.tryes.length) {
        this.addNewTry(exercise);
      }
    }

    // Обработка предыдущего поля: удаление не заполненных траев
    const previouslySelectedIndex = event.previouslySelectedIndex - countStepBeforeExercises;
    if (previouslySelectedIndex >= 0 && previouslySelectedIndex < this.protoTraining.exercises.length) {
      const exercise = this.training.getExercise(this.protoTraining.exercises[previouslySelectedIndex]);
      if (exercise) {
        const filtered = exercise.tryes.filter((el: MyTry) => !el.isEmpty());
        exercise.tryes = filtered;
        exercise.tryes.forEach((el: MyTry, index: number) => el.index = index);
      }
    }

    // Сохраняем текущую тренеровку: 
    this.programService.saveTraining().subscribe();
  }

  getTryesByProtoExercise(protoExercise: ProtoExercise) {
    const exercise = this.training.getExercise(protoExercise);
    return exercise && exercise.tryes || [];
  }

  getExerciseByProtoExercise(protoExercise: ProtoExercise) {
    return this.training.getExercise(protoExercise);
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

  private _closeTraining() {
    console.log('Close Training');
    this.training.isCompleted = true;
    this.programService.saveTraining().subscribe();
    this.router.navigate(['/']);
  }

  trySave() {
    // todo: Проверить, всё ли заполнено, если да, то сохранить и перейти назад в навигаторе
    this.showDebug();
    this.programService.saveTraining().subscribe();
    // console.log('trySave::', this.training, this.training.canComplete);
    const text = this.training.canComplete ? 'Завершить тренеровку?' : 'Не все упрежнения выполнены. Завершить тренеровку?';
    this.openDialog(
      {info: text, btnOk: true},
      (res) => {
        if (res) {
          this._closeTraining();
        }
    });
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
    const exercise = this.training.getExercise(protoExercise);
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
