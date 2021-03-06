import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@app/_services/authentication-service.service';
import { EmployerService } from '@app/_services/employer.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EmployerGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser.role === 'EMPLOYER' || currentUser.role === 'STAFFER') {
      if (!currentUser.firstName) {
        return this.authenticationService.getUserByToken(currentUser.token).pipe(map(
          data => {
            this.authenticationService.currentUserSubject.next({ ...data.user, token: currentUser.token });
            // @ts-ignore
            if (route.routeConfig.path !== 'profile' && !data.user.hasFinishedProfile) {
              this.router.navigate(['/employer/profile']);
              return false;
            }
            if (!(route.routeConfig.path == 'branches' || route.routeConfig.path == 'branches/add' || 
            route.routeConfig.path == 'profile' || route.routeConfig.path == 'password')) {
              if (data.user.company_profile) {
                if (!data.user.company_profile.hasLocations) {
                  this.router.navigate(['/employer/branches/add']);
                  return false;
                }
              }
            }
            // @ts-ignore
            if (route.routeConfig.path == 'jobs/add' && !data.user.company_profile.verified) {
              this.router.navigate(['/employer/jobs']);
              return false;
            }
            // authorised so return true
            return true;
          }));
      } else {
        // @ts-ignore
        if (route.routeConfig.path !== 'profile' && !currentUser.hasFinishedProfile) {
          this.router.navigate(['/employer/profile']);
          return false;
        }
        if (!(route.routeConfig.path == 'branches' || route.routeConfig.path == 'branches/add' || 
        route.routeConfig.path == 'profile' || route.routeConfig.path == 'password')) {
          if (currentUser.company_profile) {
            if (!currentUser.company_profile.hasLocations) {
              this.router.navigate(['/employer/branches/add']);
              return false;
            }
          }
        }
        // @ts-ignore
        if (route.routeConfig.path == 'jobs/add' && !currentUser.company_profile.verified) {
          this.router.navigate(['/employer/jobs']);
          return false;
        }
        // authorised so return true
        return true;
      }
    }


  }
}
