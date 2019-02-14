import { Injectable } from '@angular/core';
import { PROGCOMPLEX } from '../consts/program_complex';
import { RestService } from './rest.service';
import { ProgramComplex } from '../classes/program-complex';
import { tap } from 'rxjs/operators';
import { Training } from '../classes/training';
import { ProtoTraining } from '../classes/proto-training';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  programComplexes: ProgramComplex[] = [];
  trainigs: Training[] = [];

  constructor(private rest: RestService) {
    console.log('ProgramsService:: INIT');

    this.getProgramComplex().subscribe();
  }

  generateId() {
    return new Date().getTime() + (Math.random() * 100).toFixed(0);
  }

  getProgramComplex() {
    return this.rest.fakeCall('', {programComplexes: [PROGCOMPLEX, PROGCOMPLEX]}).pipe(
      tap(res => this.programComplexes = res.programComplexes)
    );
  }

  saveTrainig() {
    // localStorage.setItem('whatever', 'something');
  }

  loadtrainigs() {

  }

  getProtoTrainigById(protoId: string) {
    console.log('getProtoTrainigById::', protoId);
    const trainigs = this.programComplexes.reduce(
      (accumulator: any, complex: ProgramComplex) => [...accumulator, ...complex.protoTrainigs],
      []
    );

    return trainigs.find((tr: ProtoTraining) => tr.id === protoId);
  }
}
