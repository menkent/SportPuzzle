import { Component, OnInit, Input } from '@angular/core';
import { MyTry } from 'src/app/classes/my-try';

@Component({
  selector: 'app-my-try',
  templateUrl: './my-try.component.html',
  styleUrls: ['./my-try.component.scss']
})
export class MyTryComponent implements OnInit {

  @Input() namespace: MyTry;

  constructor() { }

  ngOnInit() {
  }

}
