import { Component, OnInit } from '@angular/core';
import { ProgramsService } from 'src/app/services/programs.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-complex-info',
  templateUrl: './complex-info.component.html',
  styleUrls: ['./complex-info.component.scss']
})
export class ComplexInfoComponent implements OnInit {

  constructor(private programsService: ProgramsService, private route: Router) { }

  ngOnInit() {
    console.log(this.route);
  }

}
