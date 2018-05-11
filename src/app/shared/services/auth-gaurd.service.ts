import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGaurdService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {  }

  canActivate(route, state:RouterStateSnapshot) {
    //if(!this.auth.user$) return false;
    //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return this.auth.user$.map(user => {
      if(user) return true;
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
      return false;
    });
  }

}
