import { Component } from '@angular/core';
import { RestService } from './services/rest.service';
import { UserInfoService } from './services/user-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _title = 'SportPuzzle';

  public get title() {
    return this.userService.user && this.userService.user.id || this._title;
  }
  public set title(value) {
    this._title = value;
  }


  get viewLoadBar() {
    return this.restService.isLoading;
  }

  get user() {
    return this.userService.user$;
  }

  constructor(private restService: RestService, private userService: UserInfoService) {
  }

  quit() {
    this.userService.qiut();
  }
}
