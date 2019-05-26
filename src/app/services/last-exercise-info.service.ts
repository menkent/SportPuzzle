import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { ProtoExercise } from '@app/classes/proto-exercise';
import { ProgramsService } from './programs.service';

@Injectable({
  providedIn: 'root'
})
export class LastExerciseInfoService {

  constructor(private rest: RestService, private programService: ProgramsService) { }

  getLastExerciseInfo(protoExercises: ProtoExercise[]) {
    // const exercises = [];
    return this.programService.trainings$.pipe(
      
    );

    // return exercises;
  }

  getLastWarmUpInfo() {}
}
