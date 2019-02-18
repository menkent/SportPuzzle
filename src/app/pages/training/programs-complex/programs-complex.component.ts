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
  lastTrainigs: Training[] = [];

  constructor(private programsService: ProgramsService, private router: Router) {
  }

  ngOnInit() {
    this.programsService.getProgramComplex().pipe(
      switchMap(res => {
        this.programComplexes = res.programComplexes;
        console.log(this.programComplexes);
        return this.programsService.loadTrainigs();
      })
    ).subscribe((trainings: Training[]) => {
      this.lastTrainigs = trainings
        .filter((tr: Training) => tr.isCompleted)
        .sort((a: Training, b: Training) => b.date - a.date);

      console.log(this.lastTrainigs);
    });
  }

  getLastTrainigDateByProto(protoTrainig: ProtoTraining) {
    const finded = this.lastTrainigs.find((tr: Training) => tr.protoTrainig.id === protoTrainig.id);
    return finded && new Date(finded.date).toLocaleDateString() || '';
  }

  trainigClick(trainigId: string) {
    console.log('trainigClick::', trainigId);
    this.router.navigate(['/trainig', trainigId]);
  }

}
