import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramsService } from '@app/services/programs.service';
import { DialogInfoService } from '@app/sport-common/dialog-info.service';
import { UserInfoService } from '@app/services/user-info.service';
import { ProgramComplex } from '@app/classes/program-complex';
import { map } from 'rxjs/operators';
import { ProtoTraining } from '@app/classes/proto-training';

@Component({
  selector: 'app-program-complex-edit',
  templateUrl: './program-complex-edit.component.html',
  styleUrls: ['./program-complex-edit.component.scss']
})
export class ProgramComplexEditComponent implements OnInit {

  programComplex: ProgramComplex = null;
  @ViewChild(NgForm) f;

  constructor(
    private route: ActivatedRoute,
    private programService: ProgramsService,
    private dialog: DialogInfoService,
    private router: Router,
    private userService: UserInfoService,
    ) { }

  ngOnInit() {
      this.route.queryParamMap.pipe(
        map(params => {
          const pcId = params.get('complexId');
          if (pcId) {
            return this.programService.programComplexes.find(pr => pr.id === pcId);
          }
        })
      ).subscribe((prComp: ProgramComplex) => {
        this.programComplex = prComp || new ProgramComplex({id: this.programService.generateId()});
        if (!this.programComplex.protoTrainings.length) {
          this.addTrainig();
        }
      });

  }

  trySave() {
    if (this.f.valid && !this.programComplex.isEmpty()) {
      // this.programService.addProtoExercise(this.exercise);
      // this.programService.saveProtoExercises().subscribe();
      // todo: call userService.saveUser();
      // Не сохранять программный комплекс без ProtoTrainigs

      // очистить пустые ProtoExercises
      this.programComplex.protoTrainings.forEach(el => el.clearEmptyExercises());
      this.programService.addProgramComplex(this.programComplex);
      this.userService.saveUser().subscribe();
      this.router.navigate(['/settings']);
    } else {
      this.dialog.openDialog({info: 'Введены не все необходимые данные.'});
    }
  }

  deleteTraining(prt: ProtoTraining) {
    const index = this.programComplex.protoTrainings.findIndex(e => e === prt);
    if (index >= 0) {
      this.programComplex.protoTrainings.splice(index, 1);
    }
  }

  addTrainig() {
    this.programComplex.protoTrainings.push(new ProtoTraining({
      id: this.programService.generateId(),
      name: `Training #${this.programComplex.protoTrainings.length + 1}`,
    }));
  }
}
