import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.verifyLogin(url);
    }

    verifyLogin(url): boolean {
        if (this.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
    public isLoggedIn(): boolean {
        let status = false;
        if ( localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('userdata') !== null) {
          status = true;
        } else {
          status = false;
        }
        return status;
    }
}
