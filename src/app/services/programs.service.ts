import { Injectable } from '@angular/core';
import { PROGCOMPLEX } from '../consts/program_complex';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  constructor(private rest: RestService) {
    console.log('ProgramsService:: INIT');
  }

  getProgramComplex() {
    return this.rest.fakeCall('', {programComplexes: [PROGCOMPLEX, PROGCOMPLEX]});
  }
}
