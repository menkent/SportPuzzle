import { Component, OnInit } from '@angular/core';
import { ProgramsService } from 'src/app/services/programs.service';
import { ProgramComplex } from 'src/app/classes/program-complex';
import { Router } from '@angular/router';

@Component({
  selector: 'app-programs-complex',
  templateUrl: './programs-complex.component.html',
  styleUrls: ['./programs-complex.component.scss']
})
export class ProgramsComplexComponent implements OnInit {

  programComplexes: ProgramComplex[] = [];

  constructor(private programsService: ProgramsService, private router: Router) { }

  ngOnInit() {
    this.programsService.getProgramComplex().subscribe(res => {
      this.programComplexes = res.programComplexes;
    });
  }

  complexClick(complexId: string) {
    console.log('complexClick::', complexId);
    this.router.navigate(['/complex-info', complexId]);
  }

}
