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
  public timerIsActive: boolean = false;
  public timeToView: string = '00:00';
  public timer: any;

  constructor() { }

  ngOnInit() {
    this.setViewTimer();
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
    const timeLost = Math.floor(this.getTime() / 1000.);;
    this.timerIsActive = false;
    clearInterval(this.timer);
    this.namespace.time += timeLost;
  }

  start() {
    if (this.timerIsActive) return;
    this.timerIsActive = true;
    this.timeStart = new Date().getTime();
    this.timer = setInterval(() => this.setViewTimer(), 330);
  }

  startStopClick() {
    if (this.timerIsActive) {
      this.stop();
    } else {
      this.start();
    }
  }
}
