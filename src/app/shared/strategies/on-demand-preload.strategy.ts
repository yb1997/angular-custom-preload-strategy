import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { EMPTY, mergeMap, Observable } from "rxjs";
import { OnDemandPreloadService } from "../services/on-demand-preload.service";

// preload strategy doesn't work on routes with guards, solution is to wrap those routes and apply guards on parent route
@Injectable({ providedIn: "root" })
export class OnDemandPreloadStrategy implements PreloadingStrategy {
  constructor(private readonly preloadOnDemand: OnDemandPreloadService) {
    this.preloadOnDemand$ = this.preloadOnDemand.state$;
  }

  private readonly preloadOnDemand$;

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return this.preloadOnDemand$.pipe(
      mergeMap((options) => {
        const shouldPreload = this.canPreload(route, options);

        return shouldPreload ? load() : EMPTY;
      })
    );
  }

  canPreload(
    route: Route,
    options: { path: string; preload: boolean }
  ): boolean {
    return (
      route?.data?.["preload"] &&
      [route.path, "*"].includes(options.path) &&
      options.preload
    );
  }
}
