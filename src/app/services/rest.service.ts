import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private _countCallings: number = 0;
  get isLoading(): boolean {
    return this._countCallings !== 0;
  }

  constructor() {
    console.log('RestService::');
  }

  doCall(url: string, data: any) {
    this._countCallings++;
    return of(null).pipe(
      delay(500),
      finalize(() => {
        this._countCallings--;
        if (this._countCallings < 0) {
          this._countCallings = 0;
        }
      } ),
      );
  }

  fakeCall(url: string, data: any) {
    this._countCallings++;
    return of(data).pipe(
      delay(500),
      finalize(() => {
        this._countCallings--;
        if (this._countCallings < 0) {
          this._countCallings = 0;
        }
      } ),
      );
  }

}
