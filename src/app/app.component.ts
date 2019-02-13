import { Component } from '@angular/core';
import { RestService } from './services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SportPuzzle';

  get viewLoadBar() {
    return this.restService.isLoading;
  }

  constructor(private restService: RestService) {}
}
