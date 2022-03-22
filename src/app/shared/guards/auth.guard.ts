import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  private readonly loginPageUrl = this.router.createUrlTree(["auth", "login"]);

  private isUserLoggedIn(): boolean {
    return !!this.authService.user;
  }

  canLoad(_route: Route, _segments: UrlSegment[]) {
    return this.isUserLoggedIn() || this.loginPageUrl;
  }

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    return this.isUserLoggedIn() || this.loginPageUrl;
  }

  canActivateChild(
    _childRoute: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ) {
    return this.isUserLoggedIn() || this.loginPageUrl;
  }
}
