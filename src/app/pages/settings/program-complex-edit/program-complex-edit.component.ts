import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramsService } from '@app/services/programs.service';
import { DialogInfoService } from '@app/sport-common/dialog-info.service';
import { UserInfoService } from '@app/services/user-info.service';
import { ProgramComplex } from '@app/classes/program-complex';
import { map } from 'rxjs/operators';

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
      });

  }

  trySave() {
    if (this.f.valid) {
      // this.programService.addProtoExercise(this.exercise);
      // this.programService.saveProtoExercises().subscribe();
      // todo: call userService.saveUser();
      this.router.navigate(['/settings']);
    } else {
      this.dialog.openDialog({info: 'Заполните Имя упражнения.'});
    }
  }
}
