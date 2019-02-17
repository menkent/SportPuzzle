import { Injectable, OnDestroy } from '@angular/core';
import { RestService } from './rest.service';
import { MyCookiesService } from './my-cookies.service';
import { User } from '../classes/user';
import { mergeMap, tap, map } from 'rxjs/operators';
import { of, BehaviorSubject, Observable, Subject } from 'rxjs';
import { USER_LIST } from '../consts/program_complex';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService implements OnDestroy {

  onDestroy$ = new Subject<void>();

  private _user: BehaviorSubject<User|null> = new BehaviorSubject(null);
  user$: Observable<User|null> = this._user.asObservable();

  public get user(): User {
    return this._user.value;
  }
  public set user(value: User) {
    this._user.next(value);
  }

  constructor(private rest: RestService, private cookie: MyCookiesService, private router: Router) {
    console.log('UserInfoService:: INIT');
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  tryLoadUser(): Observable<any> {
    return this.user ? of(this.user) : this.cookie.get('userId').pipe(
      mergeMap((userId: string) => userId ? this.loadUser(userId) : of(null)),
    );
  }

  loadUser(userId) {
    const user = USER_LIST.find((u: User) => u.id === userId);
    return this.rest.fakeCall('', {user: user}).pipe(
      map(({user}) => {
        this.user = user;
        return user;
      })
    );
    // попробовать загрузить юзера из локалстоража (или куков), если его там нет, то предложить выбрать (авторизоваться)
  }

  authorizeUser() {
    if (this.user) {
      this.cookie.set('userId', this.user.id).subscribe();
    }
  }

  qiut() {
    if (this.user) {
      this.cookie.set('userId', '').subscribe();
      this.user = null;
      this.router.navigate(['/login']);
    }
  }

  get isAuthenticated() {
    console.log('isAuthenticated::', !!this.user);
    return !!this.user;
  }
}
