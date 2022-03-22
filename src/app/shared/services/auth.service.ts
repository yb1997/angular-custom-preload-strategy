import { Injectable } from "@angular/core";
import { of, ReplaySubject, tap } from "rxjs";
import { LoginStatus } from "../models/login-status.model";
import { User } from "../models/user.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor() {
    const user = JSON.parse(localStorage.getItem("user") as string) as {
      username: string;
    };
    if (user) {
      this.user = user;
      this._loginStatus$.next("loggedIn");
    } else {
      this._loginStatus$.next("loggedOut");
    }
  }

  private readonly _loginStatus$ = new ReplaySubject<LoginStatus>();
  public readonly loginStatus$ = this._loginStatus$.asObservable();

  public user: { username: string } | null = null;

  login(user: User) {
    return of("some token").pipe(
      tap(() => {
        this.user = { username: user.username };
        localStorage.setItem("user", JSON.stringify(this.user));
        this._loginStatus$.next("loggedIn");
      })
    );
  }

  logout(): void {
    localStorage.removeItem("user");
    this.user = null;
    this._loginStatus$.next("loggedOut");
  }
}
