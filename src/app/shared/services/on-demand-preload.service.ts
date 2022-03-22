import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OnDemandPreloadService {
  constructor() { }
  private readonly _state$ = new ReplaySubject<{ path: string, preload: boolean }>();
  public readonly state$ = this._state$.asObservable();

  preload(path: string, preload = true) {
    this._state$.next({ path, preload });
  }
}
