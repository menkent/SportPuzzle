import { Component, OnInit } from '@angular/core';
import { ProgramsService } from 'src/app/services/programs.service';
import { ProgramComplex } from 'src/app/classes/program-complex';
import { Router } from '@angular/router';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource, MatTreeNestedDataSource } from '@angular/material';

@Component({
  selector: 'app-programs-complex',
  templateUrl: './programs-complex.component.html',
  styleUrls: ['./programs-complex.component.scss']
})
export class ProgramsComplexComponent implements OnInit {

  programComplexes: ProgramComplex[] = [];

  constructor(private programsService: ProgramsService, private router: Router) {
  }

  ngOnInit() {
    this.programsService.getProgramComplex().subscribe(res => {
      this.programComplexes = res.programComplexes;
      console.log(this.programComplexes);
    });
  }

  trainigClick(trainigId: string) {
    console.log('trainigClick::', trainigId);
    this.router.navigate(['/trainig', trainigId]);
  }

}
