import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { ProgramComplex } from '../classes/program-complex';
import { Training } from '../classes/training';
import { ProtoTraining } from '../classes/proto-training';
import { UserInfoService } from './user-info.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Exercise } from '../classes/exercise';
import { ProtoExercise } from '../classes/proto-exercise';
import { map } from 'rxjs/operators';
import { getAllContProtoExercise } from '@app/consts/exercises_conts';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  private isLoadTrainingsForUser: string = '';
  private isLoadExercisesForUser: string = '';

  get programComplexes(): ProgramComplex[] {
    const user = this.userInfo.user;
    return user && user.programComplexes || [];
  }
  // trainings: Training[] = [];
  // Старые тренировки + текущая тренировка
  private _trainings: BehaviorSubject<Training[]> = new BehaviorSubject([]);
  trainings$: Observable<Training[]> = this._trainings.asObservable();

  public get trainings(): Training[] {
    return this._trainings.value;
  }
  public set trainings(value: Training[]) {
    this._trainings.next(value);
  }

  addTraining(training) {
    this.trainings = [...this.trainings, training];
  }

  delTraining(training) {
    const index = this.trainings.findIndex(el => el === training);
    if (index >= 0) {
      this.trainings.splice(index, 1);
    }
  }

  private _exercises: BehaviorSubject<ProtoExercise[]> = new BehaviorSubject([]);
  exercises$: Observable<ProtoExercise[]> = this._exercises.asObservable();

  public get exercises(): ProtoExercise[] {
    return this._exercises.value;
  }
  public set exercises(value: ProtoExercise[]) {
    this._exercises.next(value);
  }


  constructor(private rest: RestService, private userInfo: UserInfoService) {
    console.log('ProgramsService:: INIT');
    this.getProgramComplex().subscribe();
  }

  generateId() {
    return (new Date().getTime() + (Math.random() * 100).toFixed(0)).toString();
  }

  adjunctionWithID(obj: Training | ProgramComplex | ProtoTraining) {
    obj.id = this.generateId();
    return obj.id;
  }

  getProgramComplex() {
    return this.rest.fakeCall('', {programComplexes: this.programComplexes});
  }

  private get localStorageUserName() {
    return `user_${this.userInfo.user && this.userInfo.user.id}`;
  }

  private get localStorageUserNameForExercises() {
    return `exercises_user_${this.userInfo.user && this.userInfo.user.id}`;
  }

  saveTraining() {
    // localStorage.setItem('whatever', 'something');
    const trainingsString = JSON.stringify(this.trainings.map((tr: Training) => {
      const m = tr.toMap();
      m['protoTraining'] = tr.protoTraining.id;
      m['protoTrainig'] = tr.protoTraining.id;
      // exercises -> to proto exercises_id
      m['exercises'] = tr.exercises.map((ex: Exercise) => {
        const exMap = ex.toMap();
        exMap['protoLink'] = ex.protoLink.id;
        return exMap;
      });
      return m;
    }));


    // console.log('saveTraining::', trainingsString);
    localStorage.setItem(this.localStorageUserName, trainingsString);
    return of(true);
  }

  loadTrainings() {
    if (this.isLoadTrainingsForUser === (this.userInfo.user && this.userInfo.user.id)) {
      return of(this.trainings);
    }
    const trainingsString = localStorage.getItem(this.localStorageUserName);
    // console.log('loadTrainings::', trainingsString);
    this.isLoadTrainingsForUser = this.userInfo.user && this.userInfo.user.id || '';
    if (trainingsString) {
      const trMaps = JSON.parse(trainingsString);
      // console.log('trMaps::', trMaps);
      const trainings = trMaps.map(trM => {
        const protoTraining: ProtoTraining = this.getProtoTrainingById(trM['protoTrainig'] || trM['protoTraining']);
        delete trM['protoTraining'];
        delete trM['protoTrainig'];
        // proto_exercies_id -> exercises
        trM['exercises'] = trM['exercises'].map((exMap) => {
          // Обратная совместимость
          if (exMap['protoLink'] instanceof Object) {
            return exMap;
          }
          const protoExerId = exMap['protoLink'];
          const protoExercise = protoTraining.exercises.find((ex: ProtoExercise) => ex.id === protoExerId);
          if (protoExercise) {
            exMap['protoLink'] = protoExercise.toMap();
          }
          return exMap;
        });
        // console.log('protoTraining::', protoTraining);
        const tr = new Training(trM);
        tr.protoTraining = protoTraining;
        return tr;
      });
      // console.log('trainings::', trainings);
      this.trainings = trainings;
    } else {
      this.trainings = [];
    }
    return of(this.trainings);
  }

  getProtoTrainingById(protoId: string): ProtoTraining {
    const trainings = this.programComplexes.reduce(
      (accumulator: any, complex: ProgramComplex) => [...accumulator, ...complex.protoTrainings],
      []
    );

    return trainings.find((tr: ProtoTraining) => tr.id === protoId);
  }

  getTrainingById(id: string) {
    return this.loadTrainings().pipe(
      map(trainings => trainings.find(el => el.id === id))
    );
  }

  loadProtoExercises() {
    if (this.isLoadExercisesForUser === (this.userInfo.user && this.userInfo.user.id)) {
      return of(this.exercises);
    }
    const exercisesString = localStorage.getItem(this.localStorageUserNameForExercises);
    this.isLoadExercisesForUser = this.userInfo.user && this.userInfo.user.id || '';
    let exercises = [];
    if (exercisesString) {
      const exMaps = JSON.parse(exercisesString);
      exercises = exMaps.map(exMap => new ProtoExercise(exMap));
    }
    this.exercises = [...exercises, ...getAllContProtoExercise()];
    return of(this.exercises);
  }

  saveProtoExercises() {
    const fixEx = getAllContProtoExercise();
    const exercises = this.exercises.filter((ex: ProtoExercise) => !fixEx.find(e => e.id === ex.id));
    console.log('exercises to save:', exercises, fixEx.length, this.exercises.length);
    const exString = JSON.stringify(exercises.map((ex: ProtoExercise) => ex.toMap()));
    localStorage.setItem(this.localStorageUserNameForExercises, exString);
    return of(true);
  }

  getProtoExerciseById(id: string) {
    return this.loadProtoExercises().pipe(
      map(exercises => exercises.find(el => el.id === id))
    );
  }

  addProtoExercise(ex: ProtoExercise) {
    const index = this.exercises.findIndex(el => el.id === ex.id);
    if (index >= 0) {
      this.exercises[index] = ex;
    } else {
      this.exercises = [ex, ...this.exercises];
    }
  }

  delProtoExercise(ex: ProtoExercise) {
    const index = this.exercises.findIndex(el => el.id === ex.id);
    if (index >= 0) {
      this.exercises.splice(index, 1);
    }
  }

}
