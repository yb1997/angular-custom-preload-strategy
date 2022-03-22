import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";
import { OnDemandPreloadService } from "src/app/shared/services/on-demand-preload.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly onDemandPreload: OnDemandPreloadService
  ) {}

  username = "";
  password = "";

  onSubmit(e: Event) {
    if (this.username && this.password) {
      this.authService
        .login({
          username: this.username,
          password: this.password,
        })
        .subscribe({
          next: (_) => {
            if (this.username === "admin") {
              // As logged in user is admin, it's more likely for them to visit admin/* routes so preload the admin module in background
              this.onDemandPreload.preload("admin");
            }
            this.router.navigate([""]);
          },
        });
    }
  }
}
