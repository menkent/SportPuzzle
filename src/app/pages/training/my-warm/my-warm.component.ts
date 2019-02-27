import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-warm',
  templateUrl: './my-warm.component.html',
  styleUrls: ['./my-warm.component.scss']
})
export class MyWarmComponent implements OnInit {

  private _namespace: string[];

  public get namespace(): string[] {
    return this._namespace;
  }
  @Input() public set namespace(value: string[]) {
    this._namespace = value;
  }

  @Input() prevWarmUp: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

}
