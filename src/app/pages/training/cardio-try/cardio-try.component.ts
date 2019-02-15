import { Component, OnInit, Input } from '@angular/core';
import { CardioInfo } from 'src/app/classes/cardio-info';
import { CardioTypesHB } from 'src/app/classes/cardio-types.enum';

@Component({
  selector: 'app-cardio-try',
  templateUrl: './cardio-try.component.html',
  styleUrls: ['./cardio-try.component.scss']
})
export class CardioTryComponent implements OnInit {

  @Input() namespace: CardioInfo;
  CardioTypesHB = CardioTypesHB;

  private timeStart: number;
  private timerIsActive: boolean = false;
  protected timeToView: string = '00:00';
  protected timer: any;

  constructor() { }

  ngOnInit() {
  }

  setViewTimer() {
    const totalSeconds = Math.floor(this.namespace.time + this.getTime() / 1000.);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60.);
    this.timeToView = `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
  }

  get viewedTime() {
    return this.timeToView;
  }

  set viewedTime(value) {
    const [minutes, secs] = value.split(':').map(x => +x);
    this.namespace.time = minutes * 60 + secs;
  }

  getTime() {
    return this.timerIsActive ? new Date().getTime() - this.timeStart : 0;
  }

  stop() {
    if (!this.timerIsActive) return;
    this.timerIsActive = false;
    clearInterval(this.timer);
    this.namespace.time += Math.floor(this.getTime() / 1000.);
  }

  start() {
    if (this.timerIsActive) return;
    this.timerIsActive = true;
    this.timeStart = new Date().getTime();
    this.timer = setInterval(() => this.setViewTimer(), 1000);
  }

  startStopClick() {
    if (this.timerIsActive) {
      this.stop();
    } else {
      this.start();
    }
  }
}
