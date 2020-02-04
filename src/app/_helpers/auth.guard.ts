import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthenticationService } from '@app/_services/authentication-service.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      var decodedToken = jwt_decode(currentUser.token);
      //console.log(decodedToken,'decoded')
      if (decodedToken.exp * 1000 < Date.now()) {
        this.router.navigate(['auth/login'], {
          queryParams: { returnUrl: state.url }
        });
      }
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(decodedToken.role) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate([`/${decodedToken.role.toLowerCase()}/home`]);
        return false;
      }
      // authorised so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['auth/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
  }
}
