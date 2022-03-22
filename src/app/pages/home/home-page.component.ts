import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
})
export class HomeComponent implements OnInit {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigate(["auth", "login"]);
  }
}
