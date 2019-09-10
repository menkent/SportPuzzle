import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProtoTraining } from 'src/app/classes/proto-training';
import { Training } from 'src/app/classes/training';
import { ProgramsService } from 'src/app/services/programs.service';
import { mergeMap, map, filter, tap, combineLatest, switchMap, takeUntil } from 'rxjs/operators';
import { MatVerticalStepper } from '@angular/material/stepper';
import { Exercise } from 'src/app/classes/exercise';
import { ProtoExercise } from 'src/app/classes/proto-exercise';
import { MyTry } from 'src/app/classes/my-try';
import { DialogInfoService } from 'src/app/sport-common/dialog-info.service';
import { of, BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnDestroy {

  onDestroy$ = new Subject<void>();
  prevTraining: Training = null;
  prevExercises: Exercise[] = [];
  protoTraining: ProtoTraining = null;
  lastStepperEvent = null;
  countStepBeforeExercises = 2;
  prevWarmUp: string[] = [];

  private _training: Training = null;
  public get training(): Training {
    return this._training;
  }
  public set training(value: Training) {
    this._training = value;
    if (value) {
      this.protoExercises = this.training.exercises.map((e: Exercise) => e.protoLink);
    }
  }

  private _protoExercises: BehaviorSubject<ProtoExercise[]> = new BehaviorSubject([]);
  public get protoExercises(): ProtoExercise[] {
    return this._protoExercises.value;
  }
  public set protoExercises(value: ProtoExercise[]) {
    this._protoExercises.next(value);
  }
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private programService: ProgramsService,
    private dialogInfo: DialogInfoService
    ) {
      this.initData();
    }

  private _createNewTraining() {
    const training = new Training({
      protoTraining: this.protoTraining,
      date: new Date().getTime(),
    });
    training.init();
    this.programService.adjunctionWithID(training);
    this.programService.addTraining(training);
    this.training = training;
  }

  private _editMode(id: string) {
    return this.programService.getTrainingById(id).pipe(tap((tr: Training) => {
      this.training = tr;
      this.protoTraining = tr.protoTraining;
    }));
  }

  private _currentMode(protoid: string) {
    this.protoTraining = this.programService.getProtoTrainingById(protoid);
    return of(null).pipe(
      mergeMap(() => {
        if (this.protoTraining) {
          return this.programService.loadTrainings();
        } else {
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

          // Последняя завершённая тренировка (из неё будем использовать разминку. Хотя можно взять просто последнюю тренеровку)
          this.prevTraining = asProtoTrainings.find((tr: Training) => tr.isCompleted);

          // Поиск последней разминки во всём комплексе
          const complex = this.programService.getProgramComplexByProtoTrainig(this.protoTraining.id);
          const lastComplexTrainig = complex && this.programService.getLastTrainigByComplex(complex);
          this.prevWarmUp = lastComplexTrainig && lastComplexTrainig.warm_up || [];

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

  initData() {
    of(null).pipe(
      combineLatest(
        this.programService.getProgramComplex(),
        this.route.paramMap,
        this.route.queryParamMap
      ),
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

    // Получение списка последних Упражнений по текущей тренеровке
    this._protoExercises.asObservable().pipe(
      takeUntil(this.onDestroy$),
      filter((v: ProtoExercise[]) => !!v.length),
      map((protoExercises: ProtoExercise[]) => protoExercises.filter((prEx: ProtoExercise) =>
        !this.prevExercises.find((el: Exercise) => el.protoLink.id === prEx.id))
      ),
      switchMap((protoExercises: ProtoExercise[]) => this.programService.getPrevExercises(protoExercises)),
      map((exercises: Exercise[]) => this.prevExercises = [...exercises, ...this.prevExercises]),
    ).subscribe();

    this.programService.loadProtoExercises().subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  showDebug() {
    console.log('proto::', this.protoTraining);
    console.log('current::', this.training);
    console.log('prev::', this.prevTraining);
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
    if (exerciseIndex >= 0 && exerciseIndex < this.training.exercises.length) {
      const exercise = this.training.exercises[exerciseIndex];
      if (!exercise.tryes.length) {
        this.addNewTry(exercise);
      }
    }

    // Обработка предыдущего поля: удаление не заполненных траев
    const previouslySelectedIndex = event.previouslySelectedIndex - countStepBeforeExercises;
    if (previouslySelectedIndex >= 0 && previouslySelectedIndex < this.training.exercises.length) {
      const exercise = this.training.exercises[previouslySelectedIndex];
      if (exercise) {
        const filtered = exercise.tryes.filter((el: MyTry) => !el.isEmpty());
        exercise.tryes = filtered;
        exercise.tryes.forEach((el: MyTry, index: number) => el.index = index);
      }
    }

    // Если предыдущий шаг был разминкой, то очистить пустые строки
    if (event.previouslySelectedIndex === 1) {
      this.training.warm_up = this.training.warm_up.filter(el => !!el);
    }
    // Если текущий шаг - разминка и нет ни одного комментария, то добавить хоть 1
    if (event.selectedIndex === 1 && this.training.warm_up.length === 0) {
      this.training.warm_up.push('');
    }

    // Сохраняем текущую тренеровку:
    this.programService.saveTraining().subscribe();
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


  userPrevExercise(protoExercise: ProtoExercise) {
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

  swapProtoExercise(exercise: Exercise, protoExercise: ProtoExercise) {
    if (this.training.getExercise(protoExercise)) {
      this.openDialog(
        {info: 'Упражнение уже присутствует в тренеровке'}, () => {});
      return;
    }

    const index = this.training.exercises.indexOf(exercise);
    if (index < 0) {
      return;
    }
    this.training.exercises[index] = new Exercise({protoLink: protoExercise});
    this.addNewTry(this.training.exercises[index]);
    this.protoExercises = this.training.exercises.map((e: Exercise) => e.protoLink);
  }

  addProtoExercise(protoExercise: ProtoExercise) {
    if (this.training.getExercise(protoExercise)) {
      this.openDialog(
        {info: 'Упражнение уже присутствует в тренеровке'}, () => {});
      return;
    }
    const exercise = new Exercise({protoLink: protoExercise});
    this.training.exercises.push(exercise);
    this.addNewTry(exercise);
    this.protoExercises = this.training.exercises.map((e: Exercise) => e.protoLink);
  }

  deleteExercise(exercise: Exercise) {
    const index = this.training.exercises.indexOf(exercise);
    if (index < 0) {
      return;
    }
    this.openDialog(
      {info: 'Удалить упражнение?', btnOk: true},
      (res) => {
        if (res) {
          this.training.exercises.splice(index, 1);
        }
    });
  }
}
