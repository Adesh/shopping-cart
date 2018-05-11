import { Observable } from 'rxjs/Observable';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGaurdService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService, private router: Router) {  }

  canActivate(route): Observable<any> {
    //if(!this.auth.user$) return false;
    //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return this.auth.appUser$
      .map(appUser => {
        if(!appUser || !appUser.isAdmin) {
          this.router.navigate(['/']);
        } 
        return appUser.isAdmin;
      })
  }

}