import { Injectable } from '@angular/core';
import { PROGCOMPLEX } from '../consts/program_complex';
import { RestService } from './rest.service';
import { ProgramComplex } from '../classes/program-complex';
import { tap } from 'rxjs/operators';
import { Training } from '../classes/training';
import { ProtoTraining } from '../classes/proto-training';
import { UserInfoService } from './user-info.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  private isLoadTrainigsForUser: string = '';

  get programComplexes(): ProgramComplex[] {
    const user = this.userInfo.user;
    return user && user.programComplexes || [];
  };
  // trainigs: Training[] = [];
  // Старые тренировки + текущая тренировка
  private _trainigs: BehaviorSubject<Training[]> = new BehaviorSubject([]);
  trainigs$: Observable<Training[]> = this._trainigs.asObservable();

  public get trainigs(): Training[] {
    return this._trainigs.value;
  }
  public set trainigs(value: Training[]) {
    this._trainigs.next(value);
  }

  addTrainig(trainig) {
    this.trainigs = [...this.trainigs, trainig];
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

  saveTrainig() {
    // localStorage.setItem('whatever', 'something');
    const trainigsString = JSON.stringify(this.trainigs.map((tr: Training) => {
      const m = tr.toMap();
      m['protoTrainig'] = tr.protoTrainig.id;
      // todo: exercises -> to proto exercises_id
      return m;
    }));


    // console.log('saveTrainig::', trainigsString);
    localStorage.setItem(this.localStorageUserName, trainigsString);
    return of(true);
  }

  loadTrainigs() {
    if (this.isLoadTrainigsForUser === (this.userInfo.user && this.userInfo.user.id)) {
      return of(this.trainigs);
    }
    const trainigsString = localStorage.getItem(this.localStorageUserName);
    // console.log('loadTrainigs::', trainigsString);
    this.isLoadTrainigsForUser = this.userInfo.user && this.userInfo.user.id || '';
    if (trainigsString) {
      const trMaps = JSON.parse(trainigsString);
      // console.log('trMaps::', trMaps);
      const trainings = trMaps.map(trM => {
        const protoTraining = this.getProtoTrainigById(trM['protoTrainig']);
        delete trM['protoTrainig'];
        // todo: proto_exercies -> exercises
        // console.log('protoTraining::', protoTraining);
        const tr = new Training(trM);
        tr.protoTrainig = protoTraining;
        return tr;
      });
      // console.log('trainings::', trainings);
      this.trainigs = trainings;
    }
    return of(this.trainigs);
  }

  getProtoTrainigById(protoId: string) {
    const trainigs = this.programComplexes.reduce(
      (accumulator: any, complex: ProgramComplex) => [...accumulator, ...complex.protoTrainigs],
      []
    );

    return trainigs.find((tr: ProtoTraining) => tr.id === protoId);
  }
}
