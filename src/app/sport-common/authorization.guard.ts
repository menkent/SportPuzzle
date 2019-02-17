import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router } from '@angular/router';
import { UserInfoService } from '../services/user-info.service';
import { Observable } from 'rxjs';
import { map, first, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot;

  constructor(public userInfo: UserInfoService, public router: Router) {}

  canActivate(): Observable<boolean> | boolean {

    return this.userInfo.tryLoadUser().pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['login']);
          return false;
        } else {
          return true
        }
      }),
      take(1),
    );
  }
}
