import { Component, OnInit } from '@angular/core';
import { ProgramsService } from 'src/app/services/programs.service';
import { ProgramComplex } from 'src/app/classes/program-complex';
import { Router } from '@angular/router';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource, MatTreeNestedDataSource } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { Training } from 'src/app/classes/training';
import { ProtoTraining } from 'src/app/classes/proto-training';

@Component({
  selector: 'app-programs-complex',
  templateUrl: './programs-complex.component.html',
  styleUrls: ['./programs-complex.component.scss']
})
export class ProgramsComplexComponent implements OnInit {

  programComplexes: ProgramComplex[] = [];
  lastTrainings: Training[] = [];
  isLoaded = false;

  constructor(private programsService: ProgramsService, private router: Router) {
  }

  ngOnInit() {
    this.programsService.getProgramComplex().pipe(
      switchMap(res => {
        this.programComplexes = res.programComplexes;
        return this.programsService.loadTrainings();
      })
    ).subscribe((trainings: Training[]) => {
      this.lastTrainings = trainings
        .filter((tr: Training) => tr.isCompleted)
        .sort((a: Training, b: Training) => b.date - a.date);
      this.isLoaded = true;
    });
  }

  getLastTrainingDateByProto(protoTraining: ProtoTraining) {
    const finded = this.lastTrainings.find((tr: Training) => tr.protoTraining.id === protoTraining.id);
    return finded && new Date(finded.date).toLocaleDateString() || '';
  }

  trainingClick(trainingId: string) {
    this.router.navigate(['/training', trainingId]);
  }

  addNewComplex() {
    this.router.navigate(['/settings/program-complex-edit']);
  }

}
