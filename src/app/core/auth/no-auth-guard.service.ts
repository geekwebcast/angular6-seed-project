import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CoreService } from '@app/core/core.service';
import { Observable } from 'rxjs';
import { map,take } from 'rxjs/operators';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private  coreService:CoreService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    let value=this.coreService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));
    console.log(this.coreService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth)));
    return this.coreService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));

  }
}