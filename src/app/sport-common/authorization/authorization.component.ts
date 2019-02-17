import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {

  userName: string = '';

  constructor(private userInfoService: UserInfoService, private router: Router) {
    this.userInfoService.user$.subscribe((user) => {
      if (user) {
        this.userInfoService.authorizeUser();
        this.router.navigate(['']);
      }
    })
  }

  authorize() {
    this.userInfoService.loadUser(this.userName).subscribe();
  }
}
