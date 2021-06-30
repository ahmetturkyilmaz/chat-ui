import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class PermissionChecker {
  constructor(private permissions: Permissions) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return true;
    // return window.localStorage.getItem('AccessToken') !== null;
  }
}
