import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProtoTraining } from 'src/app/classes/proto-training';
import { Training } from 'src/app/classes/training';
import { ProgramsService } from 'src/app/services/programs.service';
import { mergeMap } from 'rxjs/operators';
import { MatVerticalStepper } from '@angular/material';

@Component({
  selector: 'app-trainig',
  templateUrl: './trainig.component.html',
  styleUrls: ['./trainig.component.scss']
})
export class TrainigComponent implements OnInit {

  protoTrainig: ProtoTraining = null;
  trainig: Training = null;

  @ViewChild(MatVerticalStepper) stepper: MatVerticalStepper;

  constructor(private route: ActivatedRoute, private programService: ProgramsService) { }

  ngOnInit() {

    this.programService.getProgramComplex().pipe(
      mergeMap(() => this.route.paramMap),
    ).subscribe((params: ParamMap) => {
      this.protoTrainig = this.programService.getProtoTrainigById(params.get('protoid'));

      console.log('========', this.protoTrainig);
      // Пока всегда создаём новую программу, позже научиться загружать из локалстоража
      this.trainig = new Training({
        protoTrainig: this.protoTrainig,
        date: new Date(),
      });
    });


    // this.route.paramMap
  }


  showDebug() {
    console.log(this.protoTrainig);
    console.log(this.trainig);
  }


  finishExercise() {
    console.log('finishExercise::', this.stepper);
  }
}
