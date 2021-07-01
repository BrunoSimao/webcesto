
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {

        if (window.sessionStorage.getItem('token') != null) {
            return true;
        } else {
            console.log('Error 401 Token Inválido, nulo!');
            this.router.navigate(['/login']);
        }

    }
}