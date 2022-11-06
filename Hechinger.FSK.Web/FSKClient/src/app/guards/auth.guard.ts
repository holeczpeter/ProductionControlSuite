import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginResults } from '../models/generated/generated';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  constructor(private accountService: AccountService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.accountService.isAuthenticated()) {
      if (this.accountService.getLoginStatus() === LoginResults.IsTemporaryPassword) {
        this.router.navigateByUrl('/account/change-temporary-password');
       
        return false;
      }
   
      return true;
    }
    else {
      this.router.navigateByUrl('account/login');
    
      return false;
    }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let storage = localStorage.getItem('availablePaths');
    if (storage) {
      const paths: Array<string> = JSON.parse(storage);
      if (paths.some(s => s.includes(childRoute.url[0].path))) {
    
        return true;
      } 
      else return false;
    }
    else return false;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.accountService.isAuthenticated()) {
      if (this.accountService.getLoginStatus() === LoginResults.IsTemporaryPassword) {
        this.router.navigateByUrl('/account/change-temporary-password');
      }
      return true;
    } else {
      this.router.navigateByUrl('/account/login');
      return false;
    }
    
  }
}
